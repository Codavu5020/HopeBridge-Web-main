import { CircleAlert, Lock } from 'lucide-react'
import { formatUSD } from '../../lib/donation'
import AmountPicker from './AmountPicker'
import PlankMeter from './PlankMeter'

// Shared form shell. The payment fields (Stripe or demo) are passed in as children.
export default function DonationFormLayout({ form, busy, error, onSubmit, disabled, children }) {
  const { donor, errors, dollars, updateDonor } = form

  return (
    <form className="donation-form" onSubmit={onSubmit} noValidate>
      <AmountPicker form={form} />
      <PlankMeter dollars={dollars} />

      <fieldset className="field-group">
        <legend>Your details</legend>
        <div className="field">
          <label htmlFor="donor-name">Full name</label>
          <input
            id="donor-name"
            autoComplete="name"
            value={donor.name}
            onChange={(e) => updateDonor('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="donor-email">Email for your receipt</label>
          <input
            id="donor-email"
            type="email"
            autoComplete="email"
            value={donor.email}
            onChange={(e) => updateDonor('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </fieldset>

      <fieldset className="field-group">
        <legend>Payment</legend>
        {children}
      </fieldset>

      {error && (
        <div className="alert alert-error" role="alert">
          <CircleAlert size={20} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" className="btn btn-sun btn-lg btn-block" disabled={busy || disabled}>
        {busy ? 'Processing…' : form.amountIsValid ? `Give ${formatUSD(dollars)}` : 'Give now'}
      </button>

      <p className="secure-note">
        <Lock size={16} aria-hidden="true" />
        Payments are encrypted and handled by Stripe. We never see your card number.
      </p>
    </form>
  )
}
