import { useEffect, useState } from 'react'
import logo from '../assets/Logo.png'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#pillars', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#contacts', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <nav id="navbar" className={open ? 'is-open' : ''}>
      <a href="#hero" className="nav-brand" onClick={close}>
        <img src={logo} alt="LogiTrail" className="nav-logo" />
      </a>

      <ul className="nav-links nav-links-desktop">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-mobile"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <button
        type="button"
        className="nav-backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={close}
      />

      <aside
        id="nav-mobile"
        className="nav-mobile"
        aria-hidden={!open}
      >
        <button
          type="button"
          className="nav-mobile-close"
          aria-label="Close menu"
          onClick={close}
        >
          &#10005;
        </button>
        <ul className="nav-links nav-links-mobile">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </nav>
  )
}

export default Navbar
