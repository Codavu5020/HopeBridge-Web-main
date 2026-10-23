import { MAX_DONATION, MIN_DONATION, PRESET_AMOUNTS, formatUSD } from '../../lib/donation'

export default function AmountPicker({ form }) {
  const { preset, custom, errors, selectPreset, updateCustom } = form
  const errorId = 'amount-error'

  return (
    <fieldset className="field-group">
      <legend>Choose your gift</legend>
      <div className="amount-grid" role="radiogroup" aria-label="Donation amount in US dollars">
        {PRESET_AMOUNTS.map((value) => (
          <label key={value} className={`amount-option${preset === value ? ' selected' : ''}`}>
            <input
              type="radio"
              name="amount"
              value={value}
              checked={preset === value}
              onChange={() => selectPreset(value)}
            />
            {formatUSD(value)}
          </label>
        ))}
        <label className={`amount-option${preset === 'custom' ? ' selected' : ''}`}>
          <input
            type="radio"
            name="amount"
            value="custom"
            checked={preset === 'custom'}
            onChange={() => selectPreset('custom')}
          />
          Other
        </label>
      </div>

      {preset === 'custom' && (
        <div className="field custom-amount">
          <label htmlFor="custom-amount">Amount in US dollars</label>
          <div className="input-prefix">
            <span aria-hidden="true">$</span>
            <input
              id="custom-amount"
              inputMode="decimal"
              autoComplete="off"
              placeholder={`${MIN_DONATION} to ${MAX_DONATION.toLocaleString('en-US')}`}
              value={custom}
              onChange={(e) => updateCustom(e.target.value)}
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? errorId : undefined}
              autoFocus
            />
          </div>
        </div>
      )}
      {errors.amount && (
        <p id={errorId} className="field-error" role="alert">
          {errors.amount}
        </p>
      )}
    </fieldset>
  )
}
