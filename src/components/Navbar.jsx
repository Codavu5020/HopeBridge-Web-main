import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container nav">
        <Link to="/" className="brand" onClick={close} aria-label="HopeBridge Foundation home">
          <BrandMark />
          <span className="brand-name">HopeBridge</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav id="primary-nav" className={`nav-links${open ? ' open' : ''}`} aria-label="Primary">
          <NavLink to="/" end onClick={close} className="nav-link">
            Foundation
          </NavLink>
          <NavLink to="/about" onClick={close} className="nav-link">
            About us
          </NavLink>
          <NavLink to="/donate" onClick={close} className="btn btn-sun btn-sm nav-cta">
            Donate
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
