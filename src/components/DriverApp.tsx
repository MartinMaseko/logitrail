import { useState } from 'react'
import './DriverApp.css'

interface Shipment {
  id: string
  reference: string
  from: string
  to: string
  status: 'pending' | 'in-transit' | 'delivered'
  pickupTime?: string
  deliveryTime?: string
  barcode: string
}

export default function DriverApp() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'shipment' | 'tracking'>('home')
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const gpsActive = true

  const shipments: Shipment[] = [
    {
      id: '1',
      reference: 'LT-2026-001',
      from: 'Johannesburg Depot',
      to: 'Pretoria Hub',
      status: 'in-transit',
      pickupTime: '08:30',
      barcode: '||||||||||||||||||'
    },
    {
      id: '2',
      reference: 'LT-2026-002',
      from: 'Sandton Center',
      to: 'Midrand Office',
      status: 'pending',
      barcode: '||||||||||||||||||'
    },
    {
      id: '3',
      reference: 'LT-2026-003',
      from: 'Centurion Warehouse',
      to: 'Ekurhuleni Branch',
      status: 'delivered',
      deliveryTime: '14:45',
      barcode: '||||||||||||||||||'
    }
  ]

  const handleSelectShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    setCurrentScreen('shipment')
  }

  const handleCheckIn = () => {
    alert('Check-in recorded at current location')
  }

  const handleCheckOut = () => {
    alert('Check-out recorded at current location')
  }

  return (
    <div className="driver-app">
      {/* Status Bar */}
      <div className="driver-header">
        <div className="driver-info">
          <div className="avatar">JD</div>
          <div>
            <h3>John Driver</h3>
            <p>Truck #1 • Online</p>
          </div>
        </div>
        <div className={`gps-status ${gpsActive ? 'active' : ''}`}>
          GPS
        </div>
      </div>

      {/* Main Content */}
      {currentScreen === 'home' && (
        <div className="driver-home">
          <div className="quick-actions">
            <button className="action-btn check-in" onClick={handleCheckIn}>
              Check In
            </button>
            <button className="action-btn check-out" onClick={handleCheckOut}>
              Check Out
            </button>
            <button className="action-btn scan" onClick={() => setCurrentScreen('tracking')}>
              Scan Barcode
            </button>
          </div>

          <div className="shipments-section">
            <h2>Today's Deliveries ({shipments.length})</h2>
            <div className="shipments-list">
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className={`shipment-card ${shipment.status}`}
                  onClick={() => handleSelectShipment(shipment)}
                >
                  <div className="shipment-header">
                    <span className="reference">{shipment.reference}</span>
                    <span className={`status-badge ${shipment.status}`}>
                      {shipment.status === 'pending' && 'Pending'}
                      {shipment.status === 'in-transit' && 'In Transit'}
                      {shipment.status === 'delivered' && 'Delivered'}
                    </span>
                  </div>
                  <div className="shipment-route">
                    <div className="location">
                      <span>{shipment.from}</span>
                    </div>
                    <div className="arrow">→</div>
                    <div className="location">
                      <span>{shipment.to}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'shipment' && selectedShipment && (
        <div className="shipment-detail">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← Back
          </button>

          <div className="detail-card">
            <h2>{selectedShipment.reference}</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <label>From</label>
                <p>{selectedShipment.from}</p>
              </div>
              <div className="detail-item">
                <label>To</label>
                <p>{selectedShipment.to}</p>
              </div>
              <div className="detail-item">
                <label>Status</label>
                <p className={`status-text ${selectedShipment.status}`}>
                  {selectedShipment.status.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="barcode-section">
              <label>Barcode</label>
              <div className="barcode-display">
                <p className="barcode-text">{selectedShipment.barcode}</p>
                <p className="barcode-number">{selectedShipment.barcode}</p>
              </div>
              <button className="scan-btn">Scan Now</button>
            </div>

            <div className="action-buttons">
              {selectedShipment.status === 'pending' && (
                <button className="btn-primary">Start Collection</button>
              )}
              {selectedShipment.status === 'in-transit' && (
                <button className="btn-primary">Complete Delivery</button>
              )}
              {selectedShipment.status === 'delivered' && (
                <button className="btn-success" disabled>
                  ✓ Delivered at {selectedShipment.deliveryTime}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'tracking' && (
        <div className="tracking-screen">
          <button className="back-btn" onClick={() => setCurrentScreen('home')}>
            ← Back
          </button>

          <div className="scan-interface">
            <h2>Scan Barcode</h2>
            <div className="camera-placeholder">
              <div className="camera-frame">
                <div className="scan-line"></div>
              </div>
            </div>
            <p>Point camera at barcode</p>
            <input
              type="text"
              placeholder="Or type barcode manually"
              className="barcode-input"
            />
            <button className="btn-primary">Submit Scan</button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="driver-nav">
        <button className={currentScreen === 'home' ? 'active' : ''} onClick={() => setCurrentScreen('home')}>
          Home
        </button>
        <button className={currentScreen === 'tracking' ? 'active' : ''} onClick={() => setCurrentScreen('tracking')}>
          Track
        </button>
        <button>Profile</button>
      </div>
    </div>
  )
}
