import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { stripePromise } from '../lib/stripe'

// Landing page for payment methods that redirect away and back (e.g. bank redirects).
export default function DonateComplete() {
  const [params] = useSearchParams()
  const secret = params.get('payment_intent_client_secret')
  const [status, setStatus] = useState(secret && stripePromise ? 'loading' : 'unknown')

  useEffect(() => {
    if (!secret || !stripePromise) return
    let cancelled = false
    stripePromise
      .then((stripe) => stripe.retrievePaymentIntent(secret))
      .then(({ paymentIntent }) => {
        if (!cancelled) setStatus(paymentIntent ? paymentIntent.status : 'unknown')
      })
      .catch(() => {
        if (!cancelled) setStatus('unknown')
      })
    return () => {
      cancelled = true
    }
  }, [secret])

  const view = {
    loading: { icon: <LoaderCircle className="spin" size={48} aria-hidden="true" />, title: 'Checking your payment…', text: 'This only takes a moment.' },
    succeeded: { icon: <CircleCheck size={48} className="success-icon" aria-hidden="true" />, title: 'Thank you for your gift.', text: 'Your payment went through and a receipt is on its way to your inbox.' },
    processing: { icon: <CircleCheck size={48} className="success-icon" aria-hidden="true" />, title: 'Your payment is processing.', text: 'We will email you a receipt as soon as it clears.' },
    requires_payment_method: { icon: <CircleAlert size={48} className="error-icon" aria-hidden="true" />, title: 'The payment did not go through.', text: 'No money was taken. Please go back and try another payment method.' },
    unknown: { icon: <CircleAlert size={48} className="error-icon" aria-hidden="true" />, title: 'We could not confirm your payment.', text: 'If you were charged, your receipt email will confirm it. Otherwise, you can try again.' },
  }
  const current = view[status] ?? view.unknown

  return (
    <section className="section">
      <div className="container narrow">
        <div className="success-card" role="status">
          {current.icon}
          <h1 className="h2-size">{current.title}</h1>
          <p className="success-lead">{current.text}</p>
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">Back to the foundation</Link>
            <Link to="/donate" className="btn btn-outline">Return to donate</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
