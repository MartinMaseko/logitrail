import { useState } from 'react'
import LoginPage from './components/LoginPage'
import DriverApp from './components/DriverApp'
import AdminDashboard from './components/AdminDashboard'
import logo from './assets/Logo.png'
import './MockupShowcase.css'

export default function MockupShowcase() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'driver' | 'admin'>('login')

  return (
    <div className="mockup-showcase">
      {/* Navigation Bar */}
      <nav className="mockup-nav">
        <div className="mockup-nav-brand">
          <img src={logo} alt="LogiTrail" className="mockup-nav-logo" />
        </div>
        <div className="mockup-nav-buttons">
          <button
            className={`mockup-nav-btn ${currentScreen === 'login' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('login')}
          >
            Login
          </button>
          <button
            className={`mockup-nav-btn ${currentScreen === 'driver' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('driver')}
          >
            Driver App
          </button>
          <button
            className={`mockup-nav-btn ${currentScreen === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentScreen('admin')}
          >
            Admin Dashboard
          </button>
        </div>
      </nav>

      {/* Screen Container */}
      <div className="screen-container">
        {currentScreen === 'login' && <LoginPage />}
        {currentScreen === 'driver' && <DriverApp />}
        {currentScreen === 'admin' && <AdminDashboard />}
      </div>

      {/* Info Footer */}
      <footer className="mockup-footer">
        <div className="footer-content">
          <h3>LogiTrail - Logistics Tracking System</h3>
          <p>Interactive mockup demonstrating the complete application workflow</p>
          <div className="features">
            <span>Real-time GPS Tracking</span>
            <span>Barcode Check-in/Check-out</span>
            <span>Live Driver Updates</span>
            <span>Admin Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
