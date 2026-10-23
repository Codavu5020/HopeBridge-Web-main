import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand brand-light" aria-label="HopeBridge Foundation home">
            <BrandMark />
            <span className="brand-name">HopeBridge</span>
          </Link>
          <p>
            Connecting children and families facing hardship to schooling, stable homes and caring
            communities.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-list">
            <li><Link to="/">Foundation</Link></li>
            <li><Link to="/#programs">Our programs</Link></li>
            <li><Link to="/#get-involved">Get involved</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/donate">Donate</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="footer-heading">About this site</h2>
          <p className="footer-note">
            HopeBridge Web was designed and built by our student group. Meet the team on the{' '}
            <Link to="/about">About page</Link>. Payments are processed by Stripe; card details never
            reach our servers.
          </p>
        </div>
      </div>
      <div className="container footer-base">
        <small>© {new Date().getFullYear()} HopeBridge Foundation. All rights reserved.</small>
      </div>
    </footer>
  )
}
