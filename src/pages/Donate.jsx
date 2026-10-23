import { useSearchParams } from 'react-router-dom'
import { HeartHandshake, ShieldCheck, Sprout } from 'lucide-react'
import DonationFlow from '../components/payment/DonationFlow'
import { giftGuide } from '../data/content'
import { formatUSD } from '../lib/donation'

export default function Donate() {
  const [params] = useSearchParams()
  const requested = Number(params.get('amount'))
  const initialAmount = Number.isFinite(requested) && requested >= 5 ? requested : 50

  return (
    <>
      <section className="page-hero" aria-labelledby="donate-title">
        <div className="container narrow-left">
          <h1 id="donate-title">Lay a plank of the Bridge Fund.</h1>
          <p className="lead">
            Your gift pays for school kits, tutoring, family essentials and volunteer training.
            Choose an amount and give securely in under a minute.
          </p>
        </div>
      </section>

      <section className="section donate-section">
        <div className="container donate-grid">
          <div className="donate-form-wrap">
            <DonationFlow key={initialAmount} initialAmount={initialAmount} />
          </div>

          <aside className="donate-aside" aria-label="About your gift">
            <h2>What your gift can do</h2>
            <ul className="aside-gifts">
              {giftGuide.map((g) => (
                <li key={g.amount}>
                  <strong>{formatUSD(g.amount)}</strong>
                  <span>{g.impact}</span>
                </li>
              ))}
            </ul>

            <ul className="trust">
              <li>
                <ShieldCheck size={22} aria-hidden="true" />
                <span>Secure checkout powered by Stripe. Card details never touch our servers.</span>
              </li>
              <li>
                <Sprout size={22} aria-hidden="true" />
                <span>Every gift goes into the Bridge Fund and is assigned to a program.</span>
              </li>
              <li>
                <HeartHandshake size={22} aria-hidden="true" />
                <span>You will receive an emailed receipt and our yearly report.</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
