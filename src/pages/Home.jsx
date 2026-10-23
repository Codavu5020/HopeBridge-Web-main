import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import BridgeIllustration from '../components/BridgeIllustration'
import Icon from '../components/Icon'
import SectionHeading from '../components/SectionHeading'
import {
  faqs,
  fundAllocation,
  fundGoal,
  giftGuide,
  howItWorks,
  programs,
  values,
  volunteerInterests,
  ways,
} from '../data/content'
import { formatUSD } from '../lib/donation'

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(null)
  const [entry, setEntry] = useState({ name: '', email: '', interest: volunteerInterests[0] })
  const [errors, setErrors] = useState({})

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (entry.name.trim().length < 2) next.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(entry.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    setErrors(next)
    if (Object.keys(next).length === 0) setSubmitted(entry)
  }

  if (submitted) {
    return (
      <div className="success-card compact" role="status">
        <CircleCheck size={36} aria-hidden="true" className="success-icon" />
        <h3>Thanks, {submitted.name.split(' ')[0]}.</h3>
        <p>
          We have noted your interest in <strong>{submitted.interest.toLowerCase()}</strong>. A
          volunteer coordinator will use {submitted.email} to share the next steps.
        </p>
        <button type="button" className="btn btn-outline" onClick={() => setSubmitted(null)}>
          Send another response
        </button>
      </div>
    )
  }

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <h3>Offer your time</h3>
      <div className="field">
        <label htmlFor="v-name">Full name</label>
        <input
          id="v-name"
          autoComplete="name"
          value={entry.name}
          onChange={(e) => setEntry({ ...entry, name: e.target.value })}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="field-error" role="alert">{errors.name}</p>}
      </div>
      <div className="field">
        <label htmlFor="v-email">Email</label>
        <input
          id="v-email"
          type="email"
          autoComplete="email"
          value={entry.email}
          onChange={(e) => setEntry({ ...entry, email: e.target.value })}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="field-error" role="alert">{errors.email}</p>}
      </div>
      <div className="field">
        <label htmlFor="v-interest">I would like to help with</label>
        <select
          id="v-interest"
          value={entry.interest}
          onChange={(e) => setEntry({ ...entry, interest: e.target.value })}
        >
          {volunteerInterests.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Join the volunteer list</button>
    </form>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Every child deserves a way across.</h1>
            <p className="lead">
              HopeBridge Foundation connects children and families facing hardship to schooling,
              stable homes and caring communities, before a hard season becomes a lost year.
            </p>
            <div className="hero-actions">
              <Link to="/donate" className="btn btn-sun btn-lg">Give to the Bridge Fund</Link>
              <a href="#programs" className="btn btn-ghost btn-lg">See how we work</a>
            </div>
          </div>
          <figure className="hero-art">
            <BridgeIllustration />
            <figcaption>Every {formatUSD(25)} you give lays one plank of the Bridge Fund.</figcaption>
          </figure>
        </div>
      </section>

      {/* Mission */}
      <section className="section" aria-labelledby="mission-title">
        <div className="container split">
          <div>
            <h2 id="mission-title" className="display-sm">Hardship rarely arrives alone.</h2>
            <p className="prose">
              A family loses income. A child misses a week of school, then a month. The gap between
              where they are and where they could be widens quietly. HopeBridge Foundation exists to
              close that gap early, with school support, practical help for families, and neighbours
              who show up.
            </p>
            <p className="prose">
              We are a small, community-rooted foundation. That means we can move quickly, know the
              names of the children we help, and tell you exactly where your gift went.
            </p>
          </div>
          <dl className="values">
            {values.map((v) => (
              <div key={v.term}>
                <dt>{v.term}</dt>
                <dd>{v.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section section-mist" aria-labelledby="programs-title">
        <div className="container">
          <SectionHeading id="programs-title" title="Three programs, one purpose">
            Each program covers a different part of what a child needs to keep moving forward.
          </SectionHeading>
          <div className="program-list">
            {programs.map((p) => (
              <article key={p.id} className="program">
                <div className="program-icon"><Icon name={p.icon} size={30} /></div>
                <div className="program-body">
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                </div>
                <ul className="program-covers" aria-label={`${p.title} covers`}>
                  {p.covers.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How a gift travels */}
      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading id="how-title" title="How a gift travels">
            From your donation to a child’s desk, in three steps.
          </SectionHeading>
          <ol className="steps">
            {howItWorks.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2026 goal */}
      <section className="section section-dark" aria-labelledby="goal-title">
        <div className="container split split-wide">
          <div>
            <SectionHeading id="goal-title" title={`Our 2026 goal: ${formatUSD(fundGoal)}`} light>
              The Bridge Fund pays for all three programs. This is how we plan to use it, so you can
              hold us to it.
            </SectionHeading>
            <Link to="/donate" className="btn btn-sun">Help build the bridge</Link>
          </div>
          <ul className="allocation" aria-label="Planned use of the 2026 Bridge Fund">
            {fundAllocation.map((row) => {
              const pct = Math.round((row.amount / fundGoal) * 100)
              return (
                <li key={row.label}>
                  <div className="allocation-head">
                    <span>{row.label}</span>
                    <span>{formatUSD(row.amount)} ({pct}%)</span>
                  </div>
                  <div className="bar" aria-hidden="true">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Gift guide */}
      <section className="section" aria-labelledby="gift-title">
        <div className="container">
          <SectionHeading id="gift-title" title="What your gift can do">
            Choose any amount. These examples show what common gifts cover.
          </SectionHeading>
          <ul className="gift-list">
            {giftGuide.map((g) => (
              <li key={g.amount}>
                <Link to={`/donate?amount=${g.amount}`} className="gift-row">
                  <span className="gift-amount">{formatUSD(g.amount)}</span>
                  <span className="gift-impact">{g.impact}</span>
                  <span className="gift-action">Give {formatUSD(g.amount)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section id="get-involved" className="section section-mist" aria-labelledby="involved-title">
        <div className="container split split-wide">
          <div>
            <SectionHeading id="involved-title" title="Give your time, skills or network">
              Money matters, and so do people. Here are three ways to join us.
            </SectionHeading>
            <ul className="ways">
              {ways.map((w) => (
                <li key={w.title}>
                  <h3>{w.title}</h3>
                  <p>{w.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <VolunteerForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container narrow">
          <SectionHeading id="faq-title" title="Questions donors ask" />
          <div className="faq">
            {faqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call */}
      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <h2 id="cta-title">A bridge is built one plank at a time.</h2>
          <Link to="/donate" className="btn btn-sun btn-lg">Lay your plank</Link>
        </div>
      </section>
    </>
  )
}
