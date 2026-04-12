import React from 'react';
import { useState } from 'react';

// ─── Mock Data ───────────────────────────────────────────────
const ACTIVE_ORDERS = [
  {
    id: 'BK-4821',
    material: 'OPC 53 Cement',
    qty: '120 bags',
    supplier: 'Sharma Building Supplies',
    status: 'in_transit',
    eta: 'Today, 3 PM',
    amount: '₹45,600',
    progress: 75,
  },
  {
    id: 'BK-4798',
    material: 'TMT Steel Fe500D',
    qty: '2.4 tons',
    supplier: 'Rathi Steels Pvt Ltd',
    status: 'confirmed',
    eta: 'Tomorrow, 10 AM',
    amount: '₹1,63,200',
    progress: 30,
  },
  {
    id: 'BK-4756',
    material: 'M-Sand',
    qty: '8 tons',
    supplier: 'Nashik Aggregates Co.',
    status: 'delivered',
    eta: 'Delivered',
    amount: '₹9,600',
    progress: 100,
  },
];

const RECENT_QUOTES = [
  {
    material: 'AAC Blocks 600x200x150',
    qty: '1200 pcs',
    responses: 5,
    bestPrice: '₹42/pc',
    posted: '2h ago',
  },
  {
    material: '20mm Aggregates',
    qty: '15 tons',
    responses: 3,
    bestPrice: '₹14,250',
    posted: '5h ago',
  },
  {
    material: 'Plywood BWR 18mm',
    qty: '40 sheets',
    responses: 7,
    bestPrice: '₹1,680/sheet',
    posted: '1d ago',
  },
];

const SAVED_SUPPLIERS = [
  {
    name: 'Sharma Building Supplies',
    location: 'Hadapsar, Pune',
    rating: 4.8,
    orders: 12,
    badge: 'SB',
  },
  {
    name: 'Rathi Steels Pvt Ltd',
    location: 'Chinchwad, Pune',
    rating: 4.6,
    orders: 5,
    badge: 'RS',
  },
  {
    name: 'Nashik Aggregates Co.',
    location: 'Nashik',
    rating: 4.9,
    orders: 8,
    badge: 'NA',
  },
];

const SPEND_DATA = [
  { month: 'Oct', val: 48 },
  { month: 'Nov', val: 72 },
  { month: 'Dec', val: 55 },
  { month: 'Jan', val: 90 },
  { month: 'Feb', val: 67 },
  { month: 'Mar', val: 110 },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'browse', label: 'Browse Materials', icon: '🔍' },
  { id: 'orders', label: 'My Orders', icon: '📦' },
  { id: 'quotes', label: 'Quotes', icon: '💬' },
  { id: 'suppliers', label: 'Saved Suppliers', icon: '⭐' },
  { id: 'payments', label: 'Payments', icon: '₹' },
];

const STATUS_CONFIG = {
  in_transit: {
    label: 'In Transit',
    color: '#E8A838',
    bg: 'rgba(232,168,56,0.12)',
  },
  confirmed: {
    label: 'Confirmed',
    color: '#3A8FD4',
    bg: 'rgba(58,143,212,0.12)',
  },
  delivered: {
    label: 'Delivered',
    color: '#5A9E3F',
    bg: 'rgba(90,158,63,0.12)',
  },
  pending: { label: 'Pending', color: '#888', bg: 'rgba(136,136,136,0.12)' },
};

// ─── Sub-components ───────────────────────────────────────────
function StatCard({ label, value, sub, accent, icon }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '24px 24px 20px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minWidth: 160,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -16,
          right: -16,
          width: 80,
          height: 80,
          background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
        }}
      />
      <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 32,
          fontWeight: 900,
          color: '#F0EDE6',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{ fontSize: 13, color: 'rgba(240,237,230,0.5)', marginTop: 6 }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{ fontSize: 11, color: accent, marginTop: 4, fontWeight: 600 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function SpendChart({ data }) {
  const max = Math.max(...data.map((d) => d.val));
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        height: 80,
        padding: '0 4px',
      }}
    >
      {data.map((d, i) => (
        <div
          key={d.month}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: '100%',
              borderRadius: '3px 3px 0 0',
              height: `${(d.val / max) * 70}px`,
              background:
                i === data.length - 1 ? '#E8A838' : 'rgba(232,168,56,0.25)',
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{ fontSize: 10, color: 'rgba(240,237,230,0.35)' }}>
            {d.month}
          </span>
        </div>
      ))}
    </div>
  );
}

function OrderCard({ order }) {
  const st = STATUS_CONFIG[order.status];
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '18px 20px',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = 'rgba(232,168,56,0.3)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: '#F0EDE6' }}>
              {order.material}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 0.5,
                color: st.color,
                background: st.bg,
                padding: '2px 8px',
                borderRadius: 3,
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              {st.label}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(240,237,230,0.4)' }}>
            {order.qty} · {order.supplier}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: '#E8A838',
            }}
          >
            {order.amount}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(240,237,230,0.35)',
              marginTop: 2,
            }}
          >
            {order.id}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            height: 3,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${order.progress}%`,
              background: order.progress === 100 ? '#5A9E3F' : '#E8A838',
              borderRadius: 2,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'rgba(240,237,230,0.35)' }}>
          {order.progress === 100 ? 'Complete' : `${order.progress}% complete`}
        </span>
        <span style={{ fontSize: 11, color: 'rgba(240,237,230,0.5)' }}>
          ETA: {order.eta}
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function ContractorDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [reqStep, setReqStep] = useState(0);
  const [reqForm, setReqForm] = useState({
    material: '',
    qty: '',
    unit: 'bags',
    site: '',
    date: '',
  });

  return (
    <div
      style={{
        fontFamily: "'Barlow', sans-serif",
        background: '#0A0A0A',
        color: '#F0EDE6',
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: sidebarOpen ? 220 : 64,
          minHeight: '100vh',
          background: '#111111',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s ease',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarOpen ? '24px 20px 20px' : '24px 16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: '#E8A838',
              flexShrink: 0,
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
            }}
          />
          {sidebarOpen && (
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 1,
                whiteSpace: 'nowrap',
              }}
            >
              BUILDKART
            </span>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: sidebarOpen ? '11px 20px' : '11px 18px',
                background:
                  activeNav === item.id
                    ? 'rgba(232,168,56,0.1)'
                    : 'transparent',
                border: 'none',
                borderLeft: `3px solid ${
                  activeNav === item.id ? '#E8A838' : 'transparent'
                }`,
                color:
                  activeNav === item.id ? '#E8A838' : 'rgba(240,237,230,0.45)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                fontFamily: "'Barlow', sans-serif",
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id)
                  e.currentTarget.style.color = '#F0EDE6';
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id)
                  e.currentTarget.style.color = 'rgba(240,237,230,0.45)';
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User profile at bottom */}
        <div
          style={{
            padding: sidebarOpen ? '16px 20px' : '16px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              flexShrink: 0,
              background: '#E8A838',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#0D0D0D',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            RP
          </div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Rajesh Patil
              </div>
              <div style={{ fontSize: 11, color: 'rgba(240,237,230,0.35)' }}>
                Contractor · Pune
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* Top bar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            height: 60,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: '#0A0A0A',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(240,237,230,0.4)',
                fontSize: 18,
                padding: 4,
              }}
            >
              ☰
            </button>
            <div>
              <span style={{ fontSize: 14, color: 'rgba(240,237,230,0.35)' }}>
                Good morning,{' '}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE6' }}>
                Rajesh
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
                padding: '7px 14px',
              }}
            >
              <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.3)' }}>
                🔍
              </span>
              <input
                placeholder="Search materials..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#F0EDE6',
                  fontSize: 13,
                  fontFamily: "'Barlow', sans-serif",
                  width: 180,
                }}
              />
            </div>

            {/* Notification bell */}
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6,
                  width: 36,
                  height: 36,
                  cursor: 'pointer',
                  color: '#F0EDE6',
                  fontSize: 15,
                }}
              >
                🔔
              </button>
              <div
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#E8A838',
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#0D0D0D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </div>
            </div>

            {/* New request CTA */}
            <button
              onClick={() => setShowNewRequest(true)}
              style={{
                background: '#E8A838',
                color: '#0D0D0D',
                border: 'none',
                borderRadius: 6,
                padding: '8px 18px',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.8,
                cursor: 'pointer',
              }}
            >
              + NEW REQUEST
            </button>
          </div>
        </header>

        {/* Dashboard body */}
        <div style={{ padding: '28px 28px 48px', flex: 1 }}>
          {/* Stat cards row */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 28,
              flexWrap: 'wrap',
            }}
          >
            <StatCard
              label="Total spent this month"
              value="₹2.18L"
              sub="↑ 18% from last month"
              accent="#E8A838"
              icon="💰"
            />
            <StatCard
              label="Active orders"
              value="4"
              sub="2 in transit"
              accent="#3A8FD4"
              icon="📦"
            />
            <StatCard
              label="Quotes received"
              value="15"
              sub="3 expiring soon"
              accent="#E8683A"
              icon="💬"
            />
            <StatCard
              label="Saved suppliers"
              value="8"
              sub="3 new this week"
              accent="#5A9E3F"
              icon="⭐"
            />
          </div>

          {/* Main grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 340px',
              gap: 20,
            }}
          >
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Active orders */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 18,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    Active Orders
                  </h3>
                  <a
                    href="#"
                    style={{
                      fontSize: 12,
                      color: '#E8A838',
                      textDecoration: 'none',
                    }}
                  >
                    View all →
                  </a>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {ACTIVE_ORDERS.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </div>

              {/* Recent quote requests */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 18,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    My Quote Requests
                  </h3>
                  <button
                    onClick={() => setShowNewRequest(true)}
                    style={{
                      background: 'rgba(232,168,56,0.1)',
                      color: '#E8A838',
                      border: '1px solid rgba(232,168,56,0.25)',
                      borderRadius: 4,
                      padding: '5px 12px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: 0.5,
                    }}
                  >
                    + POST NEW
                  </button>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  {RECENT_QUOTES.map((q, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 0',
                        borderBottom:
                          i < RECENT_QUOTES.length - 1
                            ? '1px solid rgba(255,255,255,0.05)'
                            : 'none',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#F0EDE6',
                            marginBottom: 3,
                          }}
                        >
                          {q.material}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'rgba(240,237,230,0.35)',
                          }}
                        >
                          {q.qty} · Posted {q.posted}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#5A9E3F',
                            fontWeight: 600,
                            marginBottom: 3,
                          }}
                        >
                          {q.responses} responses
                        </div>
                        <div
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: 15,
                            fontWeight: 800,
                            color: '#E8A838',
                          }}
                        >
                          Best: {q.bestPrice}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Spend chart */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    Monthly Spend
                  </h3>
                  <span
                    style={{ fontSize: 11, color: 'rgba(240,237,230,0.35)' }}
                  >
                    Last 6 months
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#E8A838',
                    marginBottom: 16,
                  }}
                >
                  ₹2.18L{' '}
                  <span
                    style={{ fontSize: 13, color: '#5A9E3F', fontWeight: 600 }}
                  >
                    ↑ 18%
                  </span>
                </div>
                <SpendChart data={SPEND_DATA} />
              </div>

              {/* Saved suppliers */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 24px',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    Saved Suppliers
                  </h3>
                  <a
                    href="#"
                    style={{
                      fontSize: 12,
                      color: '#E8A838',
                      textDecoration: 'none',
                    }}
                  >
                    View all
                  </a>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                >
                  {SAVED_SUPPLIERS.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 6,
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor =
                          'rgba(232,168,56,0.25)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor =
                          'rgba(255,255,255,0.06)')
                      }
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: '#E8A838',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#0D0D0D',
                          fontFamily: "'Barlow Condensed', sans-serif",
                          flexShrink: 0,
                        }}
                      >
                        {s.badge}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#F0EDE6',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {s.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'rgba(240,237,230,0.35)',
                            marginTop: 2,
                          }}
                        >
                          {s.location}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#E8A838',
                            fontWeight: 700,
                          }}
                        >
                          ★ {s.rating}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: 'rgba(240,237,230,0.3)',
                            marginTop: 1,
                          }}
                        >
                          {s.orders} orders
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick request button */}
                <button
                  onClick={() => setShowNewRequest(true)}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    background: 'rgba(232,168,56,0.08)',
                    border: '1px dashed rgba(232,168,56,0.3)',
                    borderRadius: 6,
                    padding: '12px',
                    color: '#E8A838',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: 0.5,
                  }}
                >
                  + POST A MATERIAL REQUEST
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── NEW REQUEST MODAL ── */}
      {showNewRequest && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowNewRequest(false);
              setReqStep(0);
            }
          }}
        >
          <div
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '32px 36px',
              width: '100%',
              maxWidth: 480,
              animation: 'slideUp 0.25s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 24,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: '0 0 4px',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 24,
                    fontWeight: 900,
                  }}
                >
                  Post Material Request
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: 'rgba(240,237,230,0.4)',
                  }}
                >
                  Get quotes from verified suppliers near you
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNewRequest(false);
                  setReqStep(0);
                }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: 4,
                  width: 30,
                  height: 30,
                  cursor: 'pointer',
                  color: '#F0EDE6',
                  fontSize: 16,
                }}
              >
                ✕
              </button>
            </div>

            {/* Step 0 - material + qty */}
            {reqStep === 0 && (
              <div style={{ animation: 'fadeUp 0.2s ease' }}>
                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.45)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      textTransform: 'uppercase',
                    }}
                  >
                    Material Name
                  </label>
                  <input
                    placeholder="e.g. OPC 53 Grade Cement, TMT Fe500D…"
                    value={reqForm.material}
                    onChange={(e) =>
                      setReqForm({ ...reqForm, material: e.target.value })
                    }
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      padding: '12px 14px',
                      fontSize: 14,
                      color: '#F0EDE6',
                      outline: 'none',
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                  <div style={{ flex: 2 }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        color: 'rgba(240,237,230,0.45)',
                        marginBottom: 8,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        textTransform: 'uppercase',
                      }}
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="120"
                      value={reqForm.qty}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, qty: e.target.value })
                      }
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        padding: '12px 14px',
                        fontSize: 14,
                        color: '#F0EDE6',
                        outline: 'none',
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        color: 'rgba(240,237,230,0.45)',
                        marginBottom: 8,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        textTransform: 'uppercase',
                      }}
                    >
                      Unit
                    </label>
                    <select
                      value={reqForm.unit}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, unit: e.target.value })
                      }
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 4,
                        padding: '12px 14px',
                        fontSize: 14,
                        color: '#F0EDE6',
                        outline: 'none',
                        fontFamily: "'Barlow', sans-serif",
                      }}
                    >
                      {[
                        'bags',
                        'tons',
                        'kg',
                        'pieces',
                        'sheets',
                        'cubic ft',
                      ].map((u) => (
                        <option
                          key={u}
                          value={u}
                          style={{ background: '#1A1A1A' }}
                        >
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setReqStep(1)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: '#E8A838',
                    color: '#0D0D0D',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    cursor: 'pointer',
                  }}
                >
                  NEXT: DELIVERY DETAILS →
                </button>
              </div>
            )}

            {/* Step 1 - site + date */}
            {reqStep === 1 && (
              <div style={{ animation: 'fadeUp 0.2s ease' }}>
                <div
                  style={{
                    background: 'rgba(232,168,56,0.08)',
                    border: '1px solid rgba(232,168,56,0.2)',
                    borderRadius: 6,
                    padding: '10px 14px',
                    marginBottom: 20,
                    fontSize: 13,
                    color: 'rgba(240,237,230,0.7)',
                  }}
                >
                  📦{' '}
                  <strong style={{ color: '#E8A838' }}>
                    {reqForm.qty} {reqForm.unit}
                  </strong>{' '}
                  of{' '}
                  <strong style={{ color: '#F0EDE6' }}>
                    {reqForm.material}
                  </strong>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.45)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      textTransform: 'uppercase',
                    }}
                  >
                    Site / Delivery Address
                  </label>
                  <input
                    placeholder="Plot 12, Baner Road, Pune - 411045"
                    value={reqForm.site}
                    onChange={(e) =>
                      setReqForm({ ...reqForm, site: e.target.value })
                    }
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      padding: '12px 14px',
                      fontSize: 14,
                      color: '#F0EDE6',
                      outline: 'none',
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.45)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      textTransform: 'uppercase',
                    }}
                  >
                    Required By
                  </label>
                  <input
                    type="date"
                    value={reqForm.date}
                    onChange={(e) =>
                      setReqForm({ ...reqForm, date: e.target.value })
                    }
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      padding: '12px 14px',
                      fontSize: 14,
                      color: '#F0EDE6',
                      outline: 'none',
                      fontFamily: "'Barlow', sans-serif",
                      colorScheme: 'dark',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => setReqStep(0)}
                    style={{
                      flex: 1,
                      padding: '13px',
                      background: 'transparent',
                      color: 'rgba(240,237,230,0.5)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={() => {
                      setShowNewRequest(false);
                      setReqStep(0);
                      setReqForm({
                        material: '',
                        qty: '',
                        unit: 'bags',
                        site: '',
                        date: '',
                      });
                    }}
                    style={{
                      flex: 2,
                      padding: '13px',
                      background: '#E8A838',
                      color: '#0D0D0D',
                      border: 'none',
                      borderRadius: 4,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: 0.8,
                      cursor: 'pointer',
                    }}
                  >
                    🚀 POST REQUEST
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder { color: rgba(240,237,230,0.2); }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
