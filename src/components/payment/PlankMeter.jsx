import { PLANK_VALUE, formatUSD } from '../../lib/donation'

const VISIBLE_PLANKS = 20

// Shows how many planks of the Bridge Fund a gift lays ($25 per plank).
export default function PlankMeter({ dollars }) {
  const planks = Math.floor(dollars / PLANK_VALUE)
  const lit = Math.min(planks, VISIBLE_PLANKS)

  let message
  if (dollars <= 0) message = 'Choose an amount to see what your gift builds.'
  else if (planks === 0) {
    message = `${formatUSD(dollars)} is a start. Every ${formatUSD(PLANK_VALUE)} lays one full plank.`
  } else {
    message = `${formatUSD(dollars)} lays ${planks} ${planks === 1 ? 'plank' : 'planks'} of the Bridge Fund.`
  }

  return (
    <div className="plank-meter">
      <div className="plank-row" aria-hidden="true">
        {Array.from({ length: VISIBLE_PLANKS }, (_, i) => (
          <span key={i} className={`plank${i < lit ? ' lit' : ''}`} />
        ))}
      </div>
      <p aria-live="polite">{message}</p>
    </div>
  )
}
