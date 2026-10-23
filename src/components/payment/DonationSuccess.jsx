import { Link } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { PLANK_VALUE, formatUSD } from '../../lib/donation'

export default function DonationSuccess({ receipt, onReset }) {
  const planks = Math.floor(receipt.amount / PLANK_VALUE)
  const isDemo = receipt.status === 'demo'

  return (
    <div className="success-card" role="status">
      <CircleCheck size={48} aria-hidden="true" className="success-icon" />
      <h2>Thank you, {receipt.name.split(' ')[0]}.</h2>
      <p className="success-lead">
        Your gift of <strong>{formatUSD(receipt.amount)}</strong>
        {planks > 0 && (
          <>
            {' '}
            lays {planks} {planks === 1 ? 'plank' : 'planks'} of the Bridge Fund
          </>
        )}
        .
      </p>

      <dl className="receipt">
        <div>
          <dt>Receipt sent to</dt>
          <dd>{receipt.email}</dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd className="mono">{receipt.reference}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            {isDemo
              ? 'Demo only, no payment taken'
              : receipt.status === 'processing'
                ? 'Processing. You will get an email when it clears.'
                : 'Paid'}
          </dd>
        </div>
      </dl>

      <div className="success-actions">
        <Link to="/" className="btn btn-primary">Back to the foundation</Link>
        <button type="button" className="btn btn-outline" onClick={onReset}>
          Make another gift
        </button>
      </div>
    </div>
  )
}
