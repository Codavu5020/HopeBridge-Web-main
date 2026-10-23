import { useMemo, useState } from 'react'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { stripeAppearance, stripePromise } from '../../lib/stripe'
import DonationFormLayout from './DonationFormLayout'

const MIN_CENTS = 500

function StripeForm({ form, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!stripe || !elements || busy) return
    setError('')
    if (!form.validate()) return

    setBusy(true)
    try {
      // 1. Validate what the donor typed into the PaymentElement
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message)
        return
      }

      // 2. Ask our server to create a PaymentIntent for this amount
      let response
      try {
        response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: form.cents,
            name: form.donor.name.trim(),
            email: form.donor.email.trim(),
          }),
        })
      } catch {
        setError(
          'We could not reach the payment server. Start it with "npm run server" and try again.',
        )
        return
      }
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.clientSecret) {
        setError(data.error || 'We could not start your payment. Please try again.')
        return
      }

      // 3. Confirm the payment with Stripe
      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/donate/complete`,
          receipt_email: form.donor.email.trim(),
          payment_method_data: {
            billing_details: { name: form.donor.name.trim(), email: form.donor.email.trim() },
          },
        },
        redirect: 'if_required',
      })

      if (confirmError) {
        setError(confirmError.message || 'Your payment could not be completed.')
        return
      }

      if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
        onSuccess({
          reference: paymentIntent.id,
          status: paymentIntent.status,
          amount: form.dollars,
          email: form.donor.email.trim(),
          name: form.donor.name.trim(),
        })
      } else {
        setError('Your payment needs another step. Please check your details and try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <DonationFormLayout
      form={form}
      busy={busy}
      error={error}
      onSubmit={handleSubmit}
      disabled={!stripe || !ready}
    >
      <PaymentElement
        onReady={() => setReady(true)}
        options={{
          layout: 'tabs',
          // We collect name and email in our own fields above
          fields: { billingDetails: { name: 'never', email: 'never' } },
        }}
      />
    </DonationFormLayout>
  )
}

export default function StripeCheckout({ form, onSuccess }) {
  // Deferred-intent mode: the PaymentElement renders before the PaymentIntent exists,
  // so the amount can change while the donor is choosing.
  const options = useMemo(
    () => ({
      mode: 'payment',
      currency: 'usd',
      amount: Math.max(MIN_CENTS, form.cents),
      appearance: stripeAppearance,
    }),
    [form.cents],
  )

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm form={form} onSuccess={onSuccess} />
    </Elements>
  )
}
