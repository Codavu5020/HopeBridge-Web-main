import { useState } from 'react'
import { MAX_DONATION, MIN_DONATION, PRESET_AMOUNTS, formatUSD } from '../lib/donation'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function useDonationForm(initialAmount = 50) {
  const isPreset = PRESET_AMOUNTS.includes(initialAmount)
  const [preset, setPreset] = useState(isPreset ? initialAmount : 'custom')
  const [custom, setCustom] = useState(isPreset ? '' : String(initialAmount))
  const [donor, setDonor] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})

  const amount = preset === 'custom' ? Number(custom) : preset
  const amountIsValid =
    Number.isFinite(amount) && amount >= MIN_DONATION && amount <= MAX_DONATION
  const dollars = amountIsValid ? Math.round(amount * 100) / 100 : 0
  const cents = Math.round(dollars * 100)

  function selectPreset(value) {
    setPreset(value)
    setErrors((e) => ({ ...e, amount: undefined }))
  }

  function updateCustom(value) {
    // Allow digits and one decimal point only
    const cleaned = value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
    setCustom(cleaned)
    setErrors((e) => ({ ...e, amount: undefined }))
  }

  function updateDonor(field, value) {
    setDonor((d) => ({ ...d, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const next = {}
    if (!amountIsValid) {
      next.amount = `Enter an amount between ${formatUSD(MIN_DONATION)} and ${formatUSD(MAX_DONATION)}.`
    }
    if (donor.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!EMAIL_PATTERN.test(donor.email.trim())) {
      next.email = 'Enter a valid email address so we can send your receipt.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  return {
    preset,
    custom,
    donor,
    errors,
    dollars,
    cents,
    amountIsValid,
    selectPreset,
    updateCustom,
    updateDonor,
    validate,
  }
}
