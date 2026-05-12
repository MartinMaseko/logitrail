import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import bannerImage from './assets/banner.png'
import mapBanner from './assets/mapbanner.jpg'


function App() {
  const servicesGridRef = useRef<HTMLDivElement>(null)
  const contactLinksRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({ name: '', contact: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const body = new URLSearchParams({
        'form-name': 'quote-request',
        ...formData,
      }).toString()
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', contact: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  useEffect(() => {
    const grid = servicesGridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const links = contactLinksRef.current
    if (!links) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          links.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(links)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.fade-up')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      {/* 1. Hero */}
      <header id="home">
        <img src={bannerImage} alt="" className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <p className="brand-tag">LogiTrail | Logistics Service</p>
          <h1 className="hero-title-one">
            Moving Possibilities.
          </h1>
          <h1 className="hero-title-two"  >
            Delivering Success.
          </h1>
          <p className="mission">
            At LogiTrail, we deliver smart, dependable logistics solutions built around
            your business. From local routes to cross-border freight, we move your goods
            safely, on time, and cost-effectively — so you can focus on what matters most:
            growing your business.
          </p>
        </div>
      </header>

      {/* 2. Core Pillars */}
      <section id="pillars">
        <div className="pillar fade-up">
          <span className="pillar-icon">&#9670;</span>
          <h2>Reliable</h2>
          <p>Consistent service you can plan around.</p>
        </div>
        <div className="pillar fade-up delay-1">
          <span className="pillar-icon">&#9670;</span>
          <h2>Efficient</h2>
          <p>Optimised routes. Minimal delays.</p>
        </div>
        <div className="pillar fade-up delay-2">
          <span className="pillar-icon">&#9670;</span>
          <h2>On Time</h2>
          <p>Punctual delivery, every shipment.</p>
        </div>
        <div className="pillar fade-up delay-3">
          <span className="pillar-icon">&#9670;</span>
          <h2>Professional</h2>
          <p>Handled with care and integrity.</p>
        </div>
      </section>

      {/* 3. About */}
      <section id="about">
        <h2 className="section-title fade-up">About LogiTrail</h2>
        <div className="about-body fade-up delay-1">
          <p>
            LogiTrail is your trusted logistics and transport partner, committed to delivering
            reliable, efficient, and professional freight solutions across Southern Africa.
            We understand that every shipment represents a commitment to your customers — and
            we take that responsibility seriously.
          </p>
          <p>
            We specialise in local, regional, and cross-border logistics, serving businesses
            of all sizes with the same level of dedication and professionalism. With a strong
            focus on operational excellence and customer satisfaction, we simplify your
            supply chain so you can concentrate on running your business with confidence.
          </p>
          <p>
            Our offering spans freight transportation, distribution, customs clearance support,
            and cross-border logistics coordination between South Africa and neighbouring countries.
            From commercial cargo and retail goods to construction materials and general freight,
            every load is managed with precision, care, and full accountability.
          </p>
          <p>
            Driven by integrity and a genuine passion for logistics, we build long-term
            partnerships with our clients — delivering tailored transport solutions that adapt
            to the demands of a fast-moving business environment.
          </p>
          <blockquote className="about-quote">
            Logistics is more than moving goods. It is about connecting businesses, unlocking
            opportunities, and keeping your supply chain moving — reliably, every time.
          </blockquote>
        </div>
      </section>

      {/* 4. Services */}
      <section id="services">
        <h2 className="section-title fade-up">Our Services</h2>
        <div className="services-grid" ref={servicesGridRef}>
          <div className="service-card">
            <h3>Transportation &amp; Freight Management</h3>
            <p>Safe, trackable, and timely delivery of goods across local, regional, and cross-border routes — with full accountability from pick-up to drop-off.</p>
          </div>
          <div className="service-card">
            <h3>Warehousing &amp; Distribution</h3>
            <p>Secure, organised storage and efficient distribution to ensure your goods reach customers accurately and on schedule.</p>
          </div>
          <div className="service-card">
            <h3>Custom Logistics Solutions</h3>
            <p>Every business has unique freight needs. We design flexible, scalable logistics plans that align with your operations and growth objectives.</p>
          </div>
        </div>
      </section>

      {/* 5. Why Partner With Us */}
      <section id="why">
        <img src={mapBanner} alt="LogiTrail coverage map across Southern Africa" className="why-map fade-up" />
        <div className="why-inner fade-up delay-1">
          <h2 className="section-title">Why Partner With Us?</h2>
          <p className="why-sub">Local Expertise. Nationwide Reach.</p>
          <p>Choosing the right logistics partner impacts your bottom line, your reputation, and your customers' experience. Here is what you gain with LogiTrail:</p>
          <ul>
            <li>Dependable, professional service on every route</li>
            <li>Competitive, transparent pricing with no hidden costs</li>
            <li>A client-first approach — your priorities drive our decisions</li>
            <li>A proven commitment to safety, compliance, and on-time delivery</li>
          </ul>
        </div>
      </section>

      {/* 6. CTA */}
      <section id="contacts">
        <h2 className="fade-up">Let LogiTrail Move Your Business Forward.</h2>
        <p className="fade-up delay-1">Ready to streamline your logistics and reduce the cost and complexity of your supply chain? Get in touch with our team today — we respond promptly.</p>
        <div className="contact-links" ref={contactLinksRef}>
          <a href="tel:+27686972815">
            <span className="contact-label">Phone</span>
            +27 68 697 2815
          </a>
          <a href="mailto:info@logitrail.co.za">
            <span className="contact-label">Email</span>
            info@logitrail.co.za
          </a>
        </div>

        {/* Quote Request Form */}
        <div className="quote-form-wrapper fade-up delay-2">
          <h3 className="quote-form-title">Request a Quote</h3>
          <p className="quote-form-sub">Tell us about your freight requirements and we will respond with a tailored quote — usually within one business day.</p>
          {formStatus === 'success' ? (
            <div className="quote-success">
              <span className="quote-success-icon">&#10003;</span>
              <p>Thank you! Your message has been sent. We'll be in touch soon.</p>
            </div>
          ) : (
            <form
              className="quote-form"
              name="quote-request"
              method="POST"
              data-netlify="true"
              onSubmit={handleFormSubmit}
            >
              <input type="hidden" name="form-name" value="quote-request" />
              <div className="quote-form-row">
                <div className="quote-field">
                  <label htmlFor="qf-name">Name</label>
                  <input
                    id="qf-name"
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="quote-field">
                  <label htmlFor="qf-contact">Contact</label>
                  <input
                    id="qf-contact"
                    type="text"
                    name="contact"
                    placeholder="Phone number or email"
                    required
                    value={formData.contact}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="quote-field">
                <label htmlFor="qf-message">Message</label>
                <textarea
                  id="qf-message"
                  name="message"
                    placeholder="Describe your freight requirements — cargo type, origin, destination, frequency, or anything else relevant…"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                />
              </div>
              {formStatus === 'error' && (
                <p className="quote-error">Something went wrong. Please try again or email us directly.</p>
              )}
              <button type="submit" className="quote-submit" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? 'Sending…' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 7. Footer */}
      <footer id="footer">
        <p className="footer-tagline">RELIABLE | EFFICIENT | ON TIME | EVERY TIME</p>
        <p className="footer-copy">
          Copyright &copy; 2026 LogiTrail Logistics Service. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default App
