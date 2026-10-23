import { Link } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { deliverables, process, stack, team } from '../data/team'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

function Avatar({ color, name }) {
  const initials = getInitials(name)
  return (
    <svg className="avatar" viewBox="0 0 80 80" role="img" aria-label={name ? `Initials of ${name}` : 'Team member'}>
      <circle cx="40" cy="40" r="40" fill={color} />
      <text x="40" y="40" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="28" fontWeight="700" fontFamily="Bricolage Grotesque, system-ui, sans-serif">
        {initials}
      </text>
    </svg>
  )
}

export default function About() {
  return (
    <>
      <section className="page-hero" aria-labelledby="about-title">
        <div className="container narrow-left">
          <h1 id="about-title">We are the team behind HopeBridge Web.</h1>
          <p className="lead">
            Four students, one brief: build a website that helps a non-profit explain its mission
            and make it simple for people to give. This page is about us and how we worked.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <SectionHeading id="team-title" title="Meet the group">
            Each of us owned a part of the project, and we reviewed each other’s work before anything
            shipped.
          </SectionHeading>
          <div className="team-grid">
            {team.map((m) => (
              <article key={m.name} className="member">
                <header className="member-head">
                  <Avatar initials={m.initials} color={m.color} name={m.name} />
                  <div>
                    <h3>{m.name}</h3>
                    <p className="member-role">{m.role}</p>
                  </div>
                </header>
                <p>{m.bio}</p>
                <ul className="chips" aria-label={`${m.name}'s focus areas`}>
                  {m.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-mist" aria-labelledby="delivered-title">
        <div className="container split split-wide">
          <div>
            <SectionHeading id="delivered-title" title="What we delivered">
              The project brief asked for a foundation website, an About page and a payment UI.
              Here is what that became.
            </SectionHeading>
          </div>
          <ul className="checklist">
            {deliverables.map((d) => (
              <li key={d}>
                <CircleCheck size={22} aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading id="process-title" title="How we built it">
            Five stages, in this order.
          </SectionHeading>
          <ol className="timeline">
            {process.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-mist" aria-labelledby="stack-title">
        <div className="container">
          <SectionHeading id="stack-title" title="What it runs on" />
          <div className="table-wrap">
            <table className="stack-table">
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">What we used it for</th>
                </tr>
              </thead>
              <tbody>
                {stack.map((s) => (
                  <tr key={s.name}>
                    <th scope="row">{s.name}</th>
                    <td>{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="about-cta">
        <div className="container cta-inner">
          <h2 id="about-cta">See what we built in action.</h2>
          <div className="hero-actions">
            <Link to="/" className="btn btn-ghost btn-lg">Read about the foundation</Link>
            <Link to="/donate" className="btn btn-sun btn-lg">Try the donation page</Link>
          </div>
        </div>
      </section>
    </>
  )
}
