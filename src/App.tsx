import { useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import bannerImage from './assets/banner.png'


function App() {
  const servicesGridRef = useRef<HTMLDivElement>(null)
  const contactLinksRef = useRef<HTMLDivElement>(null)

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
            At LogiTrail, we provide smart, dependable logistics solutions tailored
            to your business needs. Our goal is to move your goods safely,
            efficiently, and cost-effectively so you can focus on growing your
            business.
          </p>
        </div>
      </header>

      {/* 2. Core Pillars */}
      <section id="pillars">
        <div className="pillar">
          <span className="pillar-icon">&#9670;</span>
          <h2>Reliable</h2>
          <p>You can count on us.</p>
        </div>
        <div className="pillar">
          <span className="pillar-icon">&#9670;</span>
          <h2>Efficient</h2>
          <p>We get it done right.</p>
        </div>
        <div className="pillar">
          <span className="pillar-icon">&#9670;</span>
          <h2>On Time</h2>
          <p>Every time.</p>
        </div>
        <div className="pillar">
          <span className="pillar-icon">&#9670;</span>
          <h2>Every Time</h2>
          <p>Your success, our mission.</p>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid" ref={servicesGridRef}>
          <div className="service-card">
            <h3>Transportation &amp; Freight Management</h3>
            <p>Safe and timely delivery of goods across local and regional routes.</p>
          </div>
          <div className="service-card">
            <h3>Warehousing &amp; Distribution</h3>
            <p>Secure storage and smooth distribution of goods to your customers.</p>
          </div>
          <div className="service-card">
            <h3>Custom Logistics Solutions</h3>
            <p>Flexible services tailored to meet your unique business requirements.</p>
          </div>
        </div>
      </section>

      {/* 4. Why Partner With Us */}
      <section id="why">
        <div className="why-inner">
          <h2 className="section-title">Why Partner With Us?</h2>
          <p className="why-sub">Local Expertise. Nationwide Reach.</p>
          <p>We pride ourselves on providing a foundation for business growth through:</p>
          <ul>
            <li>Reliable and professional service</li>
            <li>Cost-effective solutions</li>
            <li>Customer-focused approach</li>
            <li>Commitment to efficiency and safety</li>
          </ul>
        </div>
      </section>

      {/* 5. CTA */}
      <section id="contacts">
        <h2>Let LogiTrail Move Your Business Forward.</h2>
        <p>Ready to optimize your supply chain? Reach out to our team today.</p>
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
      </section>

      {/* 6. Footer */}
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
