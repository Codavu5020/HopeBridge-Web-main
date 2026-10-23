import { useState } from 'react'
import { Info } from 'lucide-react'
import DonationFormLayout from './DonationFormLayout'

const digits = (value) => value.replace(/\D/g, '')

function formatCard(value) {
  return digits(value).slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const d = digits(value).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

function expiryIsValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  return new Date(year, month, 1) > new Date()
}

// Shown only when VITE_STRIPE_PUBLISHABLE_KEY is not set, so the UI can still be reviewed.
// Nothing is charged and no card data leaves the browser.
export default function DemoCheckout({ form, onSuccess }) {
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [busy, setBusy] = useState(false)

  function update(field, value) {
    setCard((c) => ({ ...c, [field]: value }))
    setFieldErrors((e) => ({ ...e, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const donorOk = form.validate()
    const next = {}
    if (digits(card.number).length !== 16) next.number = 'Enter the 16-digit card number.'
    if (!expiryIsValid(card.expiry)) next.expiry = 'Enter a future date as MM/YY.'
    if (digits(card.cvc).length < 3) next.cvc = 'Enter the 3 or 4 digit security code.'
    setFieldErrors(next)
    if (!donorOk || Object.keys(next).length > 0) return

    setBusy(true)
    window.setTimeout(() => {
      onSuccess({
        reference: `demo_${Date.now().toString(36)}`,
        status: 'demo',
        amount: form.dollars,
        email: form.donor.email.trim(),
        name: form.donor.name.trim(),
      })
    }, 1200)
  }

  return (
    <DonationFormLayout form={form} busy={busy} error="" onSubmit={handleSubmit} disabled={false}>
      <div className="alert alert-info">
        <Info size={20} aria-hidden="true" />
        <span>
          <strong>Demo mode.</strong> Add <code>VITE_STRIPE_PUBLISHABLE_KEY</code> to your{' '}
          <code>.env</code> file to switch on live Stripe checkout. Nothing is charged here.
        </span>
      </div>

      <div className="field">
        <label htmlFor="card-number">Card number</label>
        <input
          id="card-number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 1234 1234 1234"
          value={card.number}
          onChange={(e) => update('number', formatCard(e.target.value))}
          aria-invalid={Boolean(fieldErrors.number)}
        />
        {fieldErrors.number && <p className="field-error" role="alert">{fieldErrors.number}</p>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="card-expiry">Expiry</label>
          <input
            id="card-expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={card.expiry}
            onChange={(e) => update('expiry', formatExpiry(e.target.value))}
            aria-invalid={Boolean(fieldErrors.expiry)}
          />
          {fieldErrors.expiry && <p className="field-error" role="alert">{fieldErrors.expiry}</p>}
        </div>
        <div className="field">
          <label htmlFor="card-cvc">Security code</label>
          <input
            id="card-cvc"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="CVC"
            value={card.cvc}
            onChange={(e) => update('cvc', digits(e.target.value).slice(0, 4))}
            aria-invalid={Boolean(fieldErrors.cvc)}
          />
          {fieldErrors.cvc && <p className="field-error" role="alert">{fieldErrors.cvc}</p>}
        </div>
      </div>
    </DonationFormLayout>
  )
}
