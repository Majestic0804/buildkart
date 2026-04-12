import React from 'react';
import { useState } from 'react';

// ─── Mock Data ─────────────────────────────────────────────────────────────
const INCOMING_ORDERS = [
  {
    id: 'BK-4821',
    contractor: 'Rajesh Patil Constructions',
    material: 'OPC 53 Cement',
    qty: '120 bags',
    amount: '₹45,600',
    status: 'pending',
    site: 'Baner, Pune',
    time: '12 min ago',
  },
  {
    id: 'BK-4810',
    contractor: 'Kavita Builders',
    material: 'TMT Steel Fe500D',
    qty: '1.8 tons',
    amount: '₹1,22,400',
    status: 'accepted',
    site: 'Wakad, Pune',
    time: '1h ago',
  },
  {
    id: 'BK-4799',
    contractor: 'Shinde Infra Pvt Ltd',
    material: 'M-Sand',
    qty: '12 tons',
    amount: '₹14,400',
    status: 'dispatched',
    site: 'Hinjewadi, Pune',
    time: '3h ago',
  },
  {
    id: 'BK-4780',
    contractor: 'Pawar Constructions',
    material: '20mm Aggregates',
    qty: '20 tons',
    amount: '₹18,000',
    status: 'delivered',
    site: 'Kothrud, Pune',
    time: 'Yesterday',
  },
];

const INITIAL_LISTINGS = [
  {
    name: 'OPC 53 Grade Cement',
    sku: 'CEM-001',
    price: '₹380/bag',
    stock: 840,
    unit: 'bags',
    active: true,
    orders: 34,
  },
  {
    name: 'TMT Steel Fe500D',
    sku: 'STL-012',
    price: '₹68/kg',
    stock: 12400,
    unit: 'kg',
    active: true,
    orders: 18,
  },
  {
    name: 'M-Sand (Washed)',
    sku: 'SND-003',
    price: '₹1,200/ton',
    stock: 85,
    unit: 'tons',
    active: true,
    orders: 27,
  },
  {
    name: '20mm Aggregates',
    sku: 'AGG-007',
    price: '₹900/ton',
    stock: 0,
    unit: 'tons',
    active: false,
    orders: 9,
  },
  {
    name: 'Plywood BWR 18mm',
    sku: 'PLY-019',
    price: '₹1,800/sheet',
    stock: 120,
    unit: 'sheets',
    active: true,
    orders: 6,
  },
];

const REVENUE_DATA = [
  { month: 'Oct', val: 3.2 },
  { month: 'Nov', val: 5.1 },
  { month: 'Dec', val: 4.4 },
  { month: 'Jan', val: 7.8 },
  { month: 'Feb', val: 6.2 },
  { month: 'Mar', val: 9.6 },
];

const QUOTE_REQUESTS = [
  {
    material: 'River Sand',
    qty: '10 tons',
    contractor: 'AB Constructions',
    budget: '₹13,000',
    expires: '4h left',
  },
  {
    material: 'OPC 43 Cement',
    qty: '200 bags',
    contractor: 'Mehta Builders',
    budget: '₹72,000',
    expires: '1d left',
  },
  {
    material: 'AAC Blocks 600x200',
    qty: '800 pcs',
    contractor: 'Pune Urban Dev',
    budget: '₹38,000',
    expires: '2d left',
  },
];

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
  { id: 'orders', label: 'Incoming Orders', icon: '📥', badge: 2 },
  { id: 'listings', label: 'My Listings', icon: '🏷️' },
  { id: 'quotes', label: 'Quote Requests', icon: '💬', badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'payouts', label: 'Payouts', icon: '₹' },
];

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    color: '#E8A838',
    bg: 'rgba(232,168,56,0.12)',
    dot: '#E8A838',
  },
  accepted: {
    label: 'Accepted',
    color: '#3A8FD4',
    bg: 'rgba(58,143,212,0.12)',
    dot: '#3A8FD4',
  },
  dispatched: {
    label: 'Dispatched',
    color: '#9B6BFF',
    bg: 'rgba(155,107,255,0.12)',
    dot: '#9B6BFF',
  },
  delivered: {
    label: 'Delivered',
    color: '#5A9E3F',
    bg: 'rgba(90,158,63,0.12)',
    dot: '#5A9E3F',
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent, icon, trend }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8,
        padding: '22px 22px 18px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minWidth: 150,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        }}
      />
      <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 30,
          fontWeight: 900,
          color: '#F0EDE6',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{ fontSize: 12, color: 'rgba(240,237,230,0.45)', marginTop: 5 }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            fontWeight: 600,
            color:
              trend === 'up'
                ? '#5A9E3F'
                : trend === 'down'
                ? '#E8503A'
                : accent,
          }}
        >
          {trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : ''}
          {sub}
        </div>
      )}
    </div>
  );
}

function RevenueChart({ data }) {
  const max = Math.max(...data.map((d) => d.val));
  return (
    <div
      style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90 }}
    >
      {data.map((d, i) => (
        <div
          key={d.month}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <div
            style={{
              fontSize: 9,
              color:
                i === data.length - 1 ? '#3A8FD4' : 'rgba(240,237,230,0.3)',
              fontWeight: 700,
            }}
          >
            {i === data.length - 1 ? `₹${d.val}L` : ''}
          </div>
          <div
            style={{
              width: '100%',
              borderRadius: '3px 3px 0 0',
              height: `${Math.round((d.val / max) * 64)}px`,
              background:
                i === data.length - 1 ? '#3A8FD4' : 'rgba(58,143,212,0.25)',
            }}
          />
          <span style={{ fontSize: 9, color: 'rgba(240,237,230,0.35)' }}>
            {d.month}
          </span>
        </div>
      ))}
    </div>
  );
}

function OrderRow({ order, onAccept, onDispatch }) {
  const st = STATUS_CONFIG[order.status];
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${
          order.status === 'pending'
            ? 'rgba(232,168,56,0.25)'
            : 'rgba(255,255,255,0.06)'
        }`,
        borderRadius: 8,
        padding: '16px 18px',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = 'rgba(58,143,212,0.3)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor =
          order.status === 'pending'
            ? 'rgba(232,168,56,0.25)'
            : 'rgba(255,255,255,0.06)')
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 10,
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
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: st.dot,
                  display: 'inline-block',
                }}
              />
              {st.label}
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'rgba(240,237,230,0.4)' }}>
            {order.qty} ·{' '}
            <span style={{ color: 'rgba(240,237,230,0.65)' }}>
              {order.contractor}
            </span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(240,237,230,0.3)',
              marginTop: 2,
            }}
          >
            📍 {order.site} · {order.time}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: '#3A8FD4',
            }}
          >
            {order.amount}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'rgba(240,237,230,0.3)',
              marginTop: 2,
            }}
          >
            {order.id}
          </div>
        </div>
      </div>
      {order.status === 'pending' && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button
            onClick={() => onAccept(order.id)}
            style={{
              flex: 1,
              padding: '8px 0',
              background: '#3A8FD4',
              color: '#F0EDE6',
              border: 'none',
              borderRadius: 4,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.5,
              cursor: 'pointer',
            }}
          >
            ACCEPT ORDER
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px 0',
              background: 'transparent',
              color: 'rgba(240,237,230,0.45)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 4,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 0.5,
              cursor: 'pointer',
            }}
          >
            DECLINE
          </button>
        </div>
      )}
      {order.status === 'accepted' && (
        <button
          onClick={() => onDispatch(order.id)}
          style={{
            width: '100%',
            marginTop: 10,
            padding: '8px 0',
            background: 'rgba(155,107,255,0.12)',
            color: '#9B6BFF',
            border: '1px solid rgba(155,107,255,0.3)',
            borderRadius: 4,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 0.5,
            cursor: 'pointer',
          }}
        >
          MARK AS DISPATCHED →
        </button>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function ShopOwnerDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState(INCOMING_ORDERS);
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [showAddListing, setShowAddListing] = useState(false);
  const [newListing, setNewListing] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    unit: 'bags',
  });
  const [activeFilter, setActiveFilter] = useState('all');

  function handleAccept(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'accepted' } : o))
    );
  }
  function handleDispatch(id) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'dispatched' } : o))
    );
  }
  function toggleListing(sku) {
    setListings((prev) =>
      prev.map((l) => (l.sku === sku ? { ...l, active: !l.active } : l))
    );
  }
  function handleAddListing() {
    if (newListing.name) {
      setListings((prev) => [
        ...prev,
        {
          name: newListing.name,
          sku: newListing.sku || 'NEW-001',
          price: newListing.price || 'TBD',
          stock: parseInt(newListing.stock) || 0,
          unit: newListing.unit,
          active: true,
          orders: 0,
        },
      ]);
    }
    setShowAddListing(false);
    setNewListing({ name: '', sku: '', price: '', stock: '', unit: 'bags' });
  }

  const filteredOrders =
    activeFilter === 'all'
      ? orders
      : orders.filter((o) => o.status === activeFilter);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

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
          background: '#111',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s ease',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
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
              background: '#3A8FD4',
              flexShrink: 0,
              clipPath: 'polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)',
            }}
          />
          {sidebarOpen && (
            <span
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
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

        {sidebarOpen && (
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(58,143,212,0.06)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'rgba(240,237,230,0.35)',
                marginBottom: 3,
                letterSpacing: 0.5,
              }}
            >
              YOUR SHOP
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>
              Sharma Building Supplies
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(240,237,230,0.4)',
                marginTop: 2,
              }}
            >
              Hadapsar, Pune · ★ 4.8
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                marginTop: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#5A9E3F',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: 10, color: '#5A9E3F', fontWeight: 600 }}>
                Shop is Live
              </span>
            </div>
          </div>
        )}

        <nav style={{ flex: 1, padding: '12px 0' }}>
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
                    ? 'rgba(58,143,212,0.1)'
                    : 'transparent',
                border: 'none',
                borderLeft: `3px solid ${
                  activeNav === item.id ? '#3A8FD4' : 'transparent'
                }`,
                color:
                  activeNav === item.id ? '#3A8FD4' : 'rgba(240,237,230,0.45)',
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
              <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {item.label}
                </span>
              )}
              {item.badge && sidebarOpen && (
                <span
                  style={{
                    marginLeft: 'auto',
                    background: item.id === 'orders' ? '#E8A838' : '#3A8FD4',
                    color: '#0D0D0D',
                    borderRadius: 10,
                    padding: '1px 7px',
                    fontSize: 10,
                    fontWeight: 800,
                    fontFamily: "'Barlow Condensed',sans-serif",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

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
              background: '#3A8FD4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#0D0D0D',
              fontFamily: "'Barlow Condensed',sans-serif",
            }}
          >
            SS
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Suresh Sharma</div>
              <div style={{ fontSize: 11, color: 'rgba(240,237,230,0.35)' }}>
                Shop Owner
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {/* Topbar */}
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
            {pendingCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(232,168,56,0.1)',
                  border: '1px solid rgba(232,168,56,0.25)',
                  borderRadius: 6,
                  padding: '6px 14px',
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#E8A838',
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{ fontSize: 12, color: '#E8A838', fontWeight: 600 }}
                >
                  {pendingCount} new order{pendingCount > 1 ? 's' : ''} waiting
                  for your response
                </span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                placeholder="Search orders, listings..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#F0EDE6',
                  fontSize: 13,
                  fontFamily: "'Barlow',sans-serif",
                  width: 200,
                }}
              />
            </div>
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
                5
              </div>
            </div>
            <button
              onClick={() => setShowAddListing(true)}
              style={{
                background: '#3A8FD4',
                color: '#F0EDE6',
                border: 'none',
                borderRadius: 6,
                padding: '8px 18px',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.8,
                cursor: 'pointer',
              }}
            >
              + ADD LISTING
            </button>
          </div>
        </header>

        {/* Body */}
        <div style={{ padding: '28px 28px 48px', flex: 1 }}>
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 28,
              flexWrap: 'wrap',
            }}
          >
            <StatCard
              label="Revenue this month"
              value="₹9.6L"
              sub="24% from last month"
              accent="#3A8FD4"
              icon="💰"
              trend="up"
            />
            <StatCard
              label="Incoming orders"
              value="12"
              sub="2 need action"
              accent="#E8A838"
              icon="📥"
            />
            <StatCard
              label="Active listings"
              value="4"
              sub="1 out of stock"
              accent="#9B6BFF"
              icon="🏷️"
            />
            <StatCard
              label="Avg. rating"
              value="4.8★"
              sub="from 94 reviews"
              accent="#5A9E3F"
              icon="⭐"
              trend="up"
            />
          </div>

          {/* Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 320px',
              gap: 20,
            }}
          >
            {/* Left col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Orders */}
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
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                    }}
                  >
                    Incoming Orders
                  </h3>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[
                      'all',
                      'pending',
                      'accepted',
                      'dispatched',
                      'delivered',
                    ].map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                          padding: '4px 10px',
                          background:
                            activeFilter === f
                              ? 'rgba(58,143,212,0.15)'
                              : 'transparent',
                          border: `1px solid ${
                            activeFilter === f
                              ? '#3A8FD4'
                              : 'rgba(255,255,255,0.08)'
                          }`,
                          borderRadius: 4,
                          color:
                            activeFilter === f
                              ? '#3A8FD4'
                              : 'rgba(240,237,230,0.4)',
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontFamily: "'Barlow Condensed',sans-serif",
                          letterSpacing: 0.3,
                          textTransform: 'capitalize',
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  {filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                      onAccept={handleAccept}
                      onDispatch={handleDispatch}
                    />
                  ))}
                  {filteredOrders.length === 0 && (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '32px 0',
                        color: 'rgba(240,237,230,0.3)',
                        fontSize: 14,
                      }}
                    >
                      No orders with this status
                    </div>
                  )}
                </div>
              </div>

              {/* Listings table */}
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
                    marginBottom: 16,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    My Listings
                  </h3>
                  <button
                    onClick={() => setShowAddListing(true)}
                    style={{
                      background: 'rgba(58,143,212,0.1)',
                      color: '#3A8FD4',
                      border: '1px solid rgba(58,143,212,0.25)',
                      borderRadius: 4,
                      padding: '5px 12px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    + ADD NEW
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr
                        style={{
                          borderBottom: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {[
                          'Material',
                          'SKU',
                          'Price',
                          'Stock',
                          'Orders',
                          'Status',
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              textAlign: 'left',
                              padding: '0 12px 10px 0',
                              fontSize: 10,
                              fontWeight: 700,
                              letterSpacing: 1,
                              color: 'rgba(240,237,230,0.35)',
                              fontFamily: "'Barlow Condensed',sans-serif",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {listings.map((l, i) => (
                        <tr
                          key={l.sku}
                          style={{
                            borderBottom:
                              i < listings.length - 1
                                ? '1px solid rgba(255,255,255,0.04)'
                                : 'none',
                            opacity: l.active ? 1 : 0.5,
                          }}
                        >
                          <td style={{ padding: '12px 12px 12px 0' }}>
                            <div style={{ fontSize: 13, fontWeight: 600 }}>
                              {l.name}
                            </div>
                          </td>
                          <td style={{ padding: '12px 12px 12px 0' }}>
                            <span
                              style={{
                                fontSize: 11,
                                color: 'rgba(240,237,230,0.4)',
                                fontFamily: 'monospace',
                              }}
                            >
                              {l.sku}
                            </span>
                          </td>
                          <td style={{ padding: '12px 12px 12px 0' }}>
                            <span
                              style={{
                                fontFamily: "'Barlow Condensed',sans-serif",
                                fontSize: 14,
                                fontWeight: 800,
                                color: '#3A8FD4',
                              }}
                            >
                              {l.price}
                            </span>
                          </td>
                          <td style={{ padding: '12px 12px 12px 0' }}>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color:
                                  l.stock === 0
                                    ? '#E8503A'
                                    : l.stock < 20
                                    ? '#E8A838'
                                    : '#5A9E3F',
                              }}
                            >
                              {l.stock === 0
                                ? 'Out of stock'
                                : `${l.stock.toLocaleString()} ${l.unit}`}
                            </span>
                          </td>
                          <td style={{ padding: '12px 12px 12px 0' }}>
                            <span
                              style={{
                                fontSize: 13,
                                color: 'rgba(240,237,230,0.6)',
                              }}
                            >
                              {l.orders}
                            </span>
                          </td>
                          <td style={{ padding: '12px 0' }}>
                            <button
                              onClick={() => toggleListing(l.sku)}
                              style={{
                                background: l.active
                                  ? 'rgba(90,158,63,0.12)'
                                  : 'rgba(255,255,255,0.05)',
                                color: l.active
                                  ? '#5A9E3F'
                                  : 'rgba(240,237,230,0.35)',
                                border: `1px solid ${
                                  l.active
                                    ? 'rgba(90,158,63,0.3)'
                                    : 'rgba(255,255,255,0.1)'
                                }`,
                                borderRadius: 4,
                                padding: '4px 10px',
                                fontSize: 10,
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontFamily: "'Barlow Condensed',sans-serif",
                                transition: 'all 0.2s',
                              }}
                            >
                              {l.active ? 'LIVE' : 'PAUSED'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Revenue chart */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 22px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 17,
                      fontWeight: 800,
                    }}
                  >
                    Monthly Revenue
                  </h3>
                  <span
                    style={{ fontSize: 10, color: 'rgba(240,237,230,0.35)' }}
                  >
                    Last 6 months
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 28,
                    fontWeight: 900,
                    color: '#3A8FD4',
                    marginBottom: 16,
                  }}
                >
                  ₹9.6L{' '}
                  <span
                    style={{ fontSize: 12, color: '#5A9E3F', fontWeight: 600 }}
                  >
                    ↑ 24%
                  </span>
                </div>
                <RevenueChart data={REVENUE_DATA} />
              </div>

              {/* Quote requests */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 22px',
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
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 17,
                      fontWeight: 800,
                    }}
                  >
                    Open Quote Requests
                  </h3>
                  <span
                    style={{
                      background: '#3A8FD4',
                      color: '#0D0D0D',
                      borderRadius: 10,
                      padding: '1px 8px',
                      fontSize: 11,
                      fontWeight: 800,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    {QUOTE_REQUESTS.length}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
                  {QUOTE_REQUESTS.map((q, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(58,143,212,0.05)',
                        border: '1px solid rgba(58,143,212,0.15)',
                        borderRadius: 7,
                        padding: '14px 15px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ fontSize: 13, fontWeight: 700 }}>
                          {q.material}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: '#E8A838',
                            fontWeight: 600,
                            background: 'rgba(232,168,56,0.1)',
                            padding: '2px 7px',
                            borderRadius: 3,
                          }}
                        >
                          ⏱ {q.expires}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(240,237,230,0.45)',
                          marginBottom: 10,
                        }}
                      >
                        {q.qty} · {q.contractor}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontSize: 14,
                            fontWeight: 800,
                            color: '#3A8FD4',
                          }}
                        >
                          Budget: {q.budget}
                        </span>
                        <button
                          style={{
                            background: '#3A8FD4',
                            color: '#F0EDE6',
                            border: 'none',
                            borderRadius: 4,
                            padding: '6px 12px',
                            fontFamily: "'Barlow Condensed',sans-serif",
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: 0.5,
                            cursor: 'pointer',
                          }}
                        >
                          SEND QUOTE
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shop performance */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: '20px 22px',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 16px',
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 17,
                    fontWeight: 800,
                  }}
                >
                  Shop Performance
                </h3>
                {[
                  ['Response rate', '94%', '#5A9E3F'],
                  ['On-time delivery', '88%', '#3A8FD4'],
                  ['Order acceptance', '76%', '#E8A838'],
                  ['Return rate', '2%', '#5A9E3F'],
                ].map(([label, val, color]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: 'rgba(240,237,230,0.55)',
                        }}
                      >
                        {label}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>
                        {val}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: 'rgba(255,255,255,0.07)',
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          borderRadius: 2,
                          width: val,
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── ADD LISTING MODAL ── */}
      {showAddListing && (
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
            if (e.target === e.currentTarget) setShowAddListing(false);
          }}
        >
          <div
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '32px 36px',
              width: '100%',
              maxWidth: 460,
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
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 24,
                    fontWeight: 900,
                  }}
                >
                  Add New Listing
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: 'rgba(240,237,230,0.4)',
                  }}
                >
                  List a material product in your shop
                </p>
              </div>
              <button
                onClick={() => setShowAddListing(false)}
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

            {[
              ['MATERIAL NAME', 'e.g. OPC 53 Grade Cement', 'name', 'text'],
              ['SKU / PRODUCT CODE', 'e.g. CEM-001', 'sku', 'text'],
              ['PRICE', 'e.g. ₹380/bag', 'price', 'text'],
              ['STOCK QUANTITY', 'e.g. 500', 'stock', 'number'],
            ].map(([label, placeholder, key, type]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    color: 'rgba(240,237,230,0.4)',
                    marginBottom: 7,
                    fontFamily: "'Barlow Condensed',sans-serif",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={newListing[key]}
                  onChange={(e) =>
                    setNewListing({ ...newListing, [key]: e.target.value })
                  }
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    padding: '11px 14px',
                    fontSize: 14,
                    color: '#F0EDE6',
                    outline: 'none',
                    fontFamily: "'Barlow',sans-serif",
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  color: 'rgba(240,237,230,0.4)',
                  marginBottom: 7,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                UNIT
              </label>
              <select
                value={newListing.unit}
                onChange={(e) =>
                  setNewListing({ ...newListing, unit: e.target.value })
                }
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '11px 14px',
                  fontSize: 14,
                  color: '#F0EDE6',
                  outline: 'none',
                  fontFamily: "'Barlow',sans-serif",
                }}
              >
                {[
                  'bags',
                  'tons',
                  'kg',
                  'pieces',
                  'sheets',
                  'cubic ft',
                  'rmt',
                ].map((u) => (
                  <option key={u} value={u} style={{ background: '#1A1A1A' }}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddListing}
              style={{
                width: '100%',
                padding: '14px',
                background: '#3A8FD4',
                color: '#F0EDE6',
                border: 'none',
                borderRadius: 4,
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 0.8,
                cursor: 'pointer',
              }}
            >
              ADD TO LISTINGS →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder { color: rgba(240,237,230,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
