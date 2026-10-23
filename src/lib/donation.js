export const PRESET_AMOUNTS = [10, 25, 50, 100, 250]
export const MIN_DONATION = 5
export const MAX_DONATION = 10000
export const PLANK_VALUE = 25 // each $25 lays one plank of the Bridge Fund

export function formatUSD(value) {
  const hasCents = Math.round(value * 100) % 100 !== 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value)
}
