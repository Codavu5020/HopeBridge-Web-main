import { useState } from 'react'
import { useDonationForm } from '../../hooks/useDonationForm'
import { stripePromise } from '../../lib/stripe'
import DemoCheckout from './DemoCheckout'
import DonationSuccess from './DonationSuccess'
import StripeCheckout from './StripeCheckout'

export default function DonationFlow({ initialAmount }) {
  const form = useDonationForm(initialAmount)
  const [receipt, setReceipt] = useState(null)

  if (receipt) {
    return <DonationSuccess receipt={receipt} onReset={() => setReceipt(null)} />
  }

  return stripePromise ? (
    <StripeCheckout form={form} onSuccess={setReceipt} />
  ) : (
    <DemoCheckout form={form} onSuccess={setReceipt} />
  )
}
