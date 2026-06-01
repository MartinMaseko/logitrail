import { useState } from 'react'
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('driver')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password, userType })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-box">
            <span className="logo-l">L</span>
          </div>
          <h1>LogiTrail</h1>
          <p className="tagline">Logistics Service</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="user-type-selector">
            <label className={`type-btn ${userType === 'driver' ? 'active' : ''}`}>
              <input
                type="radio"
                value="driver"
                checked={userType === 'driver'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Driver
            </label>
            <label className={`type-btn ${userType === 'admin' ? 'active' : ''}`}>
              <input
                type="radio"
                value="admin"
                checked={userType === 'admin'}
                onChange={(e) => setUserType(e.target.value)}
              />
              Admin
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

          <div className="login-footer">
            <a href="#forgot">Forgot Password?</a>
            <span className="divider">•</span>
            <a href="#support">Need Help?</a>
          </div>
        </form>
      </div>

      <div className="login-background">
        <div className="truck-icon"></div>
        <div className="route-path"></div>
      </div>
    </div>
  )
}
