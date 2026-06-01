import { useState } from 'react'
import './AdminDashboard.css'

interface Delivery {
  id: string
  reference: string
  driver: string
  from: string
  to: string
  status: 'pending' | 'in-transit' | 'delivered'
  progress: number
  timestamp: string
}

interface LabelRecord {
  id: string
  reference: string
  from: string
  to: string
  barcode: string
  checkInStatus: 'pending' | 'checked-in' | 'delivered'
  checkInTime?: string
  deliveryImage?: string
  printStatus: 'idle' | 'printing' | 'printed'
}

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'deliveries' | 'barcodes'>('dashboard')
  const [_selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)

  const [labels, setLabels] = useState<LabelRecord[]>([
    {
      id: '1',
      reference: 'LT-2026-001',
      from: 'Johannesburg Depot',
      to: 'Pretoria Hub',
      barcode: '460102600010',
      checkInStatus: 'checked-in',
      checkInTime: '08:30',
      printStatus: 'printed',
    },
    {
      id: '2',
      reference: 'LT-2026-002',
      from: 'Sandton Center',
      to: 'Midrand Office',
      barcode: '460102600020',
      checkInStatus: 'pending',
      printStatus: 'idle',
    },
    {
      id: '3',
      reference: 'LT-2026-003',
      from: 'Centurion Warehouse',
      to: 'Ekurhuleni Branch',
      barcode: '460102600030',
      checkInStatus: 'delivered',
      checkInTime: '14:45',
      printStatus: 'printed',
    },
    {
      id: '4',
      reference: 'LT-2026-004',
      from: 'Fourways Mall',
      to: 'Rosebank Center',
      barcode: '460102600040',
      checkInStatus: 'checked-in',
      checkInTime: '10:15',
      printStatus: 'printed',
    },
  ])

  function handlePrint(id: string) {
    setLabels(prev => prev.map(l => l.id === id ? { ...l, printStatus: 'printing' } : l))
    setTimeout(() => {
      setLabels(prev => prev.map(l => l.id === id ? { ...l, printStatus: 'printed' } : l))
    }, 2000)
  }

  const deliveries: Delivery[] = [
    {
      id: '1',
      reference: 'LT-2026-001',
      driver: 'John Driver',
      from: 'Johannesburg Depot',
      to: 'Pretoria Hub',
      status: 'in-transit',
      progress: 65,
      timestamp: '08:30'
    },
    {
      id: '2',
      reference: 'LT-2026-002',
      driver: 'Mike Johnson',
      from: 'Sandton Center',
      to: 'Midrand Office',
      status: 'pending',
      progress: 0,
      timestamp: '09:00'
    },
    {
      id: '3',
      reference: 'LT-2026-003',
      driver: 'John Driver',
      from: 'Centurion Warehouse',
      to: 'Ekurhuleni Branch',
      status: 'delivered',
      progress: 100,
      timestamp: '14:45'
    },
    {
      id: '4',
      reference: 'LT-2026-004',
      driver: 'Mike Johnson',
      from: 'Fourways Mall',
      to: 'Rosebank Center',
      status: 'in-transit',
      progress: 45,
      timestamp: '10:15'
    }
  ]

  const stats = [
    { label: 'Total Deliveries', value: '24', icon: '', color: '#2d5016' },
    { label: 'In Transit', value: '8', icon: '', color: '#2196F3' },
    { label: 'Completed', value: '15', icon: '', color: '#4CAF50' },
    { label: 'Active Drivers', value: '2', icon: '', color: '#d4af37' }
  ]

  return (
    <div className="admin-dashboard">
      {/* Header */}

      {/* Navigation Tabs */}
      <div className="admin-nav-tabs">
        <button
          className={`nav-tab ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`nav-tab ${currentView === 'deliveries' ? 'active' : ''}`}
          onClick={() => setCurrentView('deliveries')}
        >
          Deliveries
        </button>
        <button
          className={`nav-tab ${currentView === 'barcodes' ? 'active' : ''}`}
          onClick={() => setCurrentView('barcodes')}
        >
          Barcodes
        </button>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {currentView === 'dashboard' && (
          <div className="dashboard-view">
            {/* Stats Grid */}
            <div className="stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-icon" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Map View */}
            <div className="map-section">
              <h2>Live Vehicle Tracking</h2>
              <div className="map-placeholder">
                <div className="map-grid">
                  <div className="map-vehicle vehicle-1">
                    <span>Truck 1</span>
                    <p>John Driver</p>
                  </div>
                  <div className="map-vehicle vehicle-2">
                    <span>Truck 2</span>
                    <p>Mike Johnson</p>
                  </div>
                </div>
                <div className="map-legend">
                  <div className="legend-item">
                    <span className="legend-dot active"></span> In Transit
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot"></span> Idle
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Deliveries */}
            <div className="recent-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <a href="#" className="view-all">View All →</a>
              </div>
              <div className="activity-list">
                {deliveries.slice(0, 3).map((delivery) => (
                  <div key={delivery.id} className="activity-item">
                    <div className="activity-icon">
                      {delivery.status === 'delivered' && '✓'}
                      {delivery.status === 'in-transit' && '→'}
                      {delivery.status === 'pending' && '⏱'}
                    </div>
                    <div className="activity-info">
                      <p className="activity-ref">{delivery.reference} • {delivery.driver}</p>
                      <small>{delivery.from} → {delivery.to}</small>
                    </div>
                    <span className={`activity-status ${delivery.status}`}>
                      {delivery.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'deliveries' && (
          <div className="deliveries-view">
            <div className="view-header">
              <h2>All Deliveries</h2>
              <div className="filter-bar">
                <select className="filter-select">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            <div className="deliveries-table">
              <div className="table-header">
                <div className="col-ref">Reference</div>
                <div className="col-driver">Driver</div>
                <div className="col-route">Route</div>
                <div className="col-status">Status</div>
                <div className="col-progress">Progress</div>
              </div>

              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="table-row"
                  onClick={() => {
                    setSelectedDelivery(delivery)
                  }}
                >
                  <div className="col-ref">
                    <strong>{delivery.reference}</strong>
                  </div>
                  <div className="col-driver">{delivery.driver}</div>
                  <div className="col-route">
                    <small>{delivery.from.substring(0, 15)}...</small>
                  </div>
                  <div className="col-status">
                    <span className={`status-badge ${delivery.status}`}>
                      {delivery.status}
                    </span>
                  </div>
                  <div className="col-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${delivery.progress}%` }}
                      ></div>
                    </div>
                    <small>{delivery.progress}%</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'barcodes' && (
          <div className="barcodes-view">
            <div className="view-header">
              <h2>Delivery Labels</h2>
              <button className="btn-generate">+ New Label</button>
            </div>

            <div className="printer-banner">
              <span className="printer-dot connected" />
              <span className="printer-name">NIIMBOT B4 — Bluetooth</span>
              <span className="printer-ready">Ready</span>
            </div>

            <div className="labels-list">
              {labels.map(label => (
                <div key={label.id} className="label-record">

                  <div className="label-barcode-col">
                    <div className="barcode-lines">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <span key={i} className={`bar ${i % 3 === 0 ? 'wide' : ''}`} />
                      ))}
                    </div>
                    <p className="label-ref">{label.reference}</p>
                    <p className="label-code">{label.barcode}</p>
                  </div>

                  <div className="label-info-col">
                    <p className="label-route">
                      <span>{label.from}</span>
                      <span className="route-arrow">→</span>
                      <span>{label.to}</span>
                    </p>
                    <div className="label-checkin">
                      <span className={`checkin-badge ${label.checkInStatus}`}>
                        {label.checkInStatus === 'checked-in' && 'Checked In'}
                        {label.checkInStatus === 'delivered' && 'Delivered'}
                        {label.checkInStatus === 'pending' && 'Pending'}
                      </span>
                      {label.checkInTime && (
                        <small className="checkin-time">at {label.checkInTime}</small>
                      )}
                    </div>
                  </div>

                  <div className="label-image-col">
                    {label.deliveryImage ? (
                      <img src={label.deliveryImage} alt="Delivery" className="delivery-thumb" />
                    ) : (
                      <button className="image-placeholder">
                        <span>+ Photo</span>
                      </button>
                    )}
                  </div>

                  <div className="label-actions-col">
                    <button
                      className={`btn-niimbot ${label.printStatus}`}
                      onClick={() => handlePrint(label.id)}
                      disabled={label.printStatus === 'printing'}
                    >
                      {label.printStatus === 'printing' && 'Printing…'}
                      {label.printStatus === 'printed' && 'Reprint'}
                      {label.printStatus === 'idle' && 'Print Label'}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
