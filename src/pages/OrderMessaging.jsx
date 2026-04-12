import React from 'react';
import { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCT = {
  id: 3,
  name: 'TMT Steel Bars Fe500D',
  category: 'Steel & TMT',
  grade: 'IS 1786:2008',
  brand: 'TATA Tiscon',
  price: 68,
  unit: 'kg',
  minQty: 100,
  stock: '24 tons',
  delivery: 'Next day',
  description:
    "TATA Tiscon Fe500D TMT bars are high-strength, earthquake-resistant reinforcement bars manufactured with superior ductility. The 'D' designation indicates enhanced ductility meeting IS 1786:2008 standards. Ideal for RCC structures, columns, beams, and slabs in seismic zones.",
  specs: [
    { label: 'Grade', value: 'Fe500D' },
    { label: 'Standard', value: 'IS 1786:2008' },
    { label: 'Yield Strength', value: '≥ 500 MPa' },
    { label: 'UTS', value: '≥ 565 MPa' },
    { label: 'Elongation', value: '≥ 16%' },
    { label: 'Bend Test', value: 'Pass (180°)' },
    { label: 'Carbon %', value: '≤ 0.25' },
    { label: 'Sulphur %', value: '≤ 0.045' },
  ],
  sizes: [
    { dia: '8mm', price: 66, inStock: true },
    { dia: '10mm', price: 67, inStock: true },
    { dia: '12mm', price: 68, inStock: true },
    { dia: '16mm', price: 69, inStock: true },
    { dia: '20mm', price: 70, inStock: true },
    { dia: '25mm', price: 72, inStock: false },
    { dia: '32mm', price: 74, inStock: false },
  ],
  images: ['🔩', '📐', '🏗️'],
};

const SHOP = {
  name: 'Rathi Steels Pvt Ltd',
  badge: 'RS',
  color: '#3A8FD4',
  location: 'Plot 14, Bhosari MIDC, Chinchwad, Pune - 411019',
  phone: '+91 98220 34510',
  rating: 4.6,
  totalOrders: 274,
  responseRate: '94%',
  onTime: '89%',
  since: '2016',
  description:
    'Authorised dealer of TATA Tiscon, JSW Neosteel and Vizag Steel. Bulk orders accepted with same-week delivery to Pune, Nashik, and Kolhapur.',
  verifiedBadges: ['GST Verified', 'ISO Certified', 'Authorised Dealer'],
};

const OTHER_SUPPLIERS = [
  {
    name: 'Pune Steel House',
    location: 'Bhosari',
    price: 70,
    rating: 4.3,
    delivery: '2 days',
  },
  {
    name: 'JSW Direct Depot',
    location: 'Talegaon',
    price: 67,
    rating: 4.5,
    delivery: 'Next day',
  },
  {
    name: 'Vizag Steel Centre',
    location: 'Hadapsar',
    price: 71,
    rating: 4.4,
    delivery: '2 days',
  },
];

const REVIEWS = [
  {
    name: 'Rajesh Patil',
    role: 'Site Engineer',
    rating: 5,
    date: 'Mar 2026',
    text: 'Excellent quality bars. Delivered on time and material matched IS standards. Will definitely order again.',
  },
  {
    name: 'Kavita Constructions',
    role: 'Contractor',
    rating: 4,
    date: 'Feb 2026',
    text: 'Good material, slight delay in dispatch but overall happy with the quality.',
  },
  {
    name: 'Shinde Infra',
    role: 'Builder',
    rating: 5,
    date: 'Jan 2026',
    text: 'Best price in Pune for Fe500D. Got 10 tons in 2 deliveries, both on time.',
  },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function Stars({ rating, size = 13 }) {
  return (
    <span style={{ color: '#E8A838', fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </h2>
      <div
        style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MaterialDetailPage() {
  const [selectedSize, setSelectedSize] = useState('12mm');
  const [qty, setQty] = useState(500);
  const [activeTab, setActiveTab] = useState('specs');
  const [activeImg, setActiveImg] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [quoteMode, setQuoteMode] = useState(false); // false = direct order

  const currentSize = PRODUCT.sizes.find((s) => s.dia === selectedSize);
  const pricePerKg = currentSize ? currentSize.price : PRODUCT.price;
  const totalEstimate = (qty * pricePerKg).toLocaleString('en-IN');

  return (
    <div
      style={{
        fontFamily: "'Barlow', sans-serif",
        background: '#0A0A0A',
        color: '#F0EDE6',
        minHeight: '100vh',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ── NAV ── */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 32px',
          height: 56,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: '#0A0A0A',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 24,
              height: 24,
              background: '#E8A838',
              clipPath: 'polygon(0 0,100% 0,100% 70%,70% 100%,0 100%)',
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            BUILDKART
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>
          ›
        </span>
        <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.45)' }}>
          Marketplace
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>
          ›
        </span>
        <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.45)' }}>
          Steel & TMT
        </span>
        <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 4px' }}>
          ›
        </span>
        <span style={{ fontSize: 13, color: '#F0EDE6', fontWeight: 500 }}>
          TMT Steel Bars Fe500D
        </span>
      </nav>

      <div
        style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 28px 80px' }}
      >
        {/* ── HERO ROW ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Left: product info */}
          <div>
            {/* Breadcrumb badge */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 16,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: '#3A8FD4',
                  background: 'rgba(58,143,212,0.12)',
                  border: '1px solid rgba(58,143,212,0.25)',
                  padding: '3px 10px',
                  borderRadius: 3,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                VERIFIED SUPPLIER
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: '#E8A838',
                  background: 'rgba(232,168,56,0.12)',
                  border: '1px solid rgba(232,168,56,0.25)',
                  padding: '3px 10px',
                  borderRadius: 3,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                BEST SELLER
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: '#5A9E3F',
                  background: 'rgba(90,158,63,0.12)',
                  border: '1px solid rgba(90,158,63,0.25)',
                  padding: '3px 10px',
                  borderRadius: 3,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                IN STOCK · {PRODUCT.stock}
              </span>
            </div>

            {/* Product name */}
            <h1
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 'clamp(28px,4vw,42px)',
                fontWeight: 900,
                lineHeight: 1.05,
                margin: '0 0 8px',
                letterSpacing: -0.5,
              }}
            >
              {PRODUCT.name}
            </h1>

            <div
              style={{
                fontSize: 13,
                color: 'rgba(240,237,230,0.45)',
                marginBottom: 20,
              }}
            >
              {PRODUCT.brand} · Grade {PRODUCT.grade} · {PRODUCT.category}
            </div>

            {/* Ratings row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 24,
              }}
            >
              <Stars rating={SHOP.rating} size={16} />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#E8A838' }}>
                {SHOP.rating}
              </span>
              <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.4)' }}>
                ({SHOP.totalOrders} orders)
              </span>
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: 'rgba(255,255,255,0.1)',
                }}
              />
              <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.5)' }}>
                🚚 {PRODUCT.delivery} delivery
              </span>
              <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.5)' }}>
                📍 Chinchwad, Pune
              </span>
            </div>

            {/* Price display */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 8,
                marginBottom: 28,
                padding: '16px 20px',
                background: 'rgba(232,168,56,0.06)',
                border: '1px solid rgba(232,168,56,0.15)',
                borderRadius: 8,
                width: 'fit-content',
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#E8A838',
                  lineHeight: 1,
                }}
              >
                ₹{pricePerKg}
              </span>
              <span style={{ fontSize: 16, color: 'rgba(240,237,230,0.5)' }}>
                / kg
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: 'rgba(240,237,230,0.3)',
                  marginLeft: 8,
                }}
              >
                Min. order: {PRODUCT.minQty} kg
              </span>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  color: 'rgba(240,237,230,0.4)',
                  marginBottom: 12,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                SELECT DIAMETER
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PRODUCT.sizes.map((s) => (
                  <button
                    key={s.dia}
                    onClick={() => s.inStock && setSelectedSize(s.dia)}
                    style={{
                      padding: '10px 16px',
                      background:
                        selectedSize === s.dia
                          ? 'rgba(232,168,56,0.15)'
                          : 'rgba(255,255,255,0.04)',
                      border: `1.5px solid ${
                        selectedSize === s.dia
                          ? '#E8A838'
                          : s.inStock
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(255,255,255,0.04)'
                      }`,
                      borderRadius: 6,
                      color:
                        selectedSize === s.dia
                          ? '#E8A838'
                          : s.inStock
                          ? 'rgba(240,237,230,0.7)'
                          : 'rgba(240,237,230,0.2)',
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: s.inStock ? 'pointer' : 'not-allowed',
                      transition: 'all 0.15s',
                      position: 'relative',
                    }}
                  >
                    {s.dia}
                    {selectedSize === s.dia && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 3,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#E8A838',
                        }}
                      />
                    )}
                    {!s.inStock && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 8,
                          color: 'rgba(240,237,230,0.3)',
                          background: 'rgba(0,0,0,0.4)',
                          borderRadius: 5,
                          fontFamily: "'Barlow Condensed',sans-serif",
                          letterSpacing: 0.5,
                        }}
                      >
                        OUT OF
                        <br />
                        STOCK
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product image strip (visual) */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              {PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 72,
                    height: 72,
                    background:
                      activeImg === i
                        ? 'rgba(232,168,56,0.1)'
                        : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${
                      activeImg === i ? '#E8A838' : 'rgba(255,255,255,0.08)'
                    }`,
                    borderRadius: 6,
                    fontSize: 28,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Order panel */}
          <div style={{ position: 'sticky', top: 72 }}>
            <div
              style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {/* Mode toggle */}
              <div
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.04)',
                  padding: 4,
                  margin: '16px 16px 0',
                  borderRadius: 7,
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {[
                  { id: false, label: 'Direct Order' },
                  { id: true, label: 'Request Quote' },
                ].map((opt) => (
                  <button
                    key={String(opt.id)}
                    onClick={() => setQuoteMode(opt.id)}
                    style={{
                      flex: 1,
                      padding: '9px 0',
                      background:
                        quoteMode === opt.id ? '#E8A838' : 'transparent',
                      color:
                        quoteMode === opt.id
                          ? '#0D0D0D'
                          : 'rgba(240,237,230,0.45)',
                      border: 'none',
                      borderRadius: 5,
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div style={{ padding: '20px 20px 24px' }}>
                {/* Size + price summary */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 7,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(240,237,230,0.35)',
                        marginBottom: 2,
                      }}
                    >
                      Selected size
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#F0EDE6',
                      }}
                    >
                      {selectedSize} TMT Bar
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(240,237,230,0.35)',
                        marginBottom: 2,
                      }}
                    >
                      Per kg
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#E8A838',
                      }}
                    >
                      ₹{pricePerKg}
                    </div>
                  </div>
                </div>

                {/* Quantity input */}
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.4)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    QUANTITY (KG)
                  </label>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <button
                      onClick={() =>
                        setQty((q) => Math.max(PRODUCT.minQty, q - 100))
                      }
                      style={{
                        width: 40,
                        height: 44,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 5,
                        color: '#F0EDE6',
                        fontSize: 20,
                        cursor: 'pointer',
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) =>
                        setQty(
                          Math.max(
                            PRODUCT.minQty,
                            parseInt(e.target.value) || PRODUCT.minQty
                          )
                        )
                      }
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '11px 8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 5,
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#F0EDE6',
                        outline: 'none',
                        fontFamily: "'Barlow Condensed',sans-serif",
                      }}
                    />
                    <button
                      onClick={() => setQty((q) => q + 100)}
                      style={{
                        width: 40,
                        height: 44,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 5,
                        color: '#F0EDE6',
                        fontSize: 20,
                        cursor: 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(240,237,230,0.25)',
                      marginTop: 5,
                    }}
                  >
                    Min. {PRODUCT.minQty} kg · ~{(qty / 1000).toFixed(2)} tons
                  </div>
                </div>

                {/* Delivery address */}
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.4)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    DELIVERY SITE
                  </label>
                  <input
                    placeholder="Enter site address..."
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 5,
                      padding: '11px 12px',
                      fontSize: 13,
                      color: '#F0EDE6',
                      outline: 'none',
                      fontFamily: "'Barlow',sans-serif",
                    }}
                  />
                </div>

                {/* Required date */}
                <div style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.4)',
                      marginBottom: 8,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    REQUIRED BY
                  </label>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 5,
                      padding: '11px 12px',
                      fontSize: 13,
                      color: '#F0EDE6',
                      outline: 'none',
                      fontFamily: "'Barlow',sans-serif",
                      colorScheme: 'dark',
                    }}
                  />
                </div>

                {/* Total estimate */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    background: 'rgba(232,168,56,0.06)',
                    border: '1px solid rgba(232,168,56,0.15)',
                    borderRadius: 7,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 10, color: 'rgba(240,237,230,0.35)' }}
                    >
                      Estimated total
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'rgba(240,237,230,0.4)',
                        marginTop: 2,
                      }}
                    >
                      {qty} kg × ₹{pricePerKg}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 24,
                      fontWeight: 900,
                      color: '#E8A838',
                    }}
                  >
                    ₹{totalEstimate}
                  </div>
                </div>

                {/* CTA */}
                {!orderPlaced ? (
                  <>
                    <button
                      onClick={() => setOrderPlaced(true)}
                      style={{
                        width: '100%',
                        padding: '15px',
                        background: '#E8A838',
                        color: '#0D0D0D',
                        border: 'none',
                        borderRadius: 6,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 16,
                        fontWeight: 900,
                        letterSpacing: 1,
                        cursor: 'pointer',
                        marginBottom: 10,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = '0.88')}
                      onMouseLeave={(e) => (e.target.style.opacity = '1')}
                    >
                      {quoteMode ? 'SEND QUOTE REQUEST →' : 'PLACE ORDER →'}
                    </button>
                    <button
                      style={{
                        width: '100%',
                        padding: '11px',
                        background: 'transparent',
                        color: 'rgba(240,237,230,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 6,
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      💬 CHAT WITH SUPPLIER
                    </button>
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '20px 16px',
                      background: 'rgba(90,158,63,0.1)',
                      border: '1px solid rgba(90,158,63,0.3)',
                      borderRadius: 8,
                      animation: 'fadeUp 0.3s ease',
                    }}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 18,
                        fontWeight: 900,
                        color: '#5A9E3F',
                        marginBottom: 4,
                      }}
                    >
                      {quoteMode ? 'Quote Requested!' : 'Order Placed!'}
                    </div>
                    <div
                      style={{ fontSize: 12, color: 'rgba(240,237,230,0.5)' }}
                    >
                      {quoteMode
                        ? 'Supplier will respond within 2 hours'
                        : 'Order BK-4899 confirmed. Track in dashboard.'}
                    </div>
                    <button
                      onClick={() => setOrderPlaced(false)}
                      style={{
                        marginTop: 12,
                        background: 'none',
                        border: 'none',
                        color: '#5A9E3F',
                        fontSize: 12,
                        cursor: 'pointer',
                        fontFamily: "'Barlow',sans-serif",
                        textDecoration: 'underline',
                      }}
                    >
                      Place another order
                    </button>
                  </div>
                )}

                {/* Assurance strip */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {[
                    ['✅', 'Quality assured'],
                    ['🔒', 'Secure payment'],
                    ['📞', '24hr support'],
                  ].map(([icon, label]) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>
                        {icon}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: 'rgba(240,237,230,0.3)',
                          fontWeight: 600,
                          letterSpacing: 0.3,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS: SPECS / DESCRIPTION / REVIEWS ── */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: 'flex',
              gap: 0,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 28,
            }}
          >
            {['specs', 'description', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  background: 'transparent',
                  color:
                    activeTab === tab ? '#E8A838' : 'rgba(240,237,230,0.45)',
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.8,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  borderBottom: `2px solid ${
                    activeTab === tab ? '#E8A838' : 'transparent'
                  }`,
                  marginBottom: -1,
                  transition: 'all 0.15s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Specs tab */}
          {activeTab === 'specs' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              {PRODUCT.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 18px',
                    background:
                      i % 2 === 0
                        ? 'rgba(255,255,255,0.025)'
                        : 'rgba(255,255,255,0.015)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 7,
                  }}
                >
                  <span
                    style={{ fontSize: 13, color: 'rgba(240,237,230,0.5)' }}
                  >
                    {spec.label}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: '#F0EDE6' }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description tab */}
          {activeTab === 'description' && (
            <div style={{ maxWidth: 720 }}>
              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(240,237,230,0.7)',
                  lineHeight: 1.75,
                  margin: '0 0 24px',
                }}
              >
                {PRODUCT.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'High ductility',
                  'Earthquake resistant',
                  'Corrosion resistant',
                  'Uniform ribbing',
                  'IS 1786:2008 certified',
                  'CRS grade available',
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      color: 'rgba(240,237,230,0.6)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '5px 12px',
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reviews tab */}
          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    padding: '18px 20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
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
                          fontFamily: "'Barlow Condensed',sans-serif",
                        }}
                      >
                        {r.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>
                          {r.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'rgba(240,237,230,0.4)',
                          }}
                        >
                          {r.role}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Stars rating={r.rating} />
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(240,237,230,0.3)',
                          marginTop: 2,
                        }}
                      >
                        {r.date}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: 'rgba(240,237,230,0.65)',
                      lineHeight: 1.65,
                    }}
                  >
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SUPPLIER PROFILE ── */}
        <div style={{ marginBottom: 40 }}>
          <SectionHeader title="About the Supplier" />
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: '24px 28px',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: 24,
              alignItems: 'start',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: SHOP.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 800,
                color: '#0D0D0D',
                fontFamily: "'Barlow Condensed',sans-serif",
              }}
            >
              {SHOP.badge}
            </div>

            {/* Info */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                  }}
                >
                  {SHOP.name}
                </span>
                <Stars rating={SHOP.rating} size={12} />
                <span
                  style={{ fontSize: 12, color: '#E8A838', fontWeight: 700 }}
                >
                  {SHOP.rating}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(240,237,230,0.4)',
                  marginBottom: 10,
                }}
              >
                📍 {SHOP.location} · Since {SHOP.since}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(240,237,230,0.6)',
                  margin: '0 0 12px',
                  lineHeight: 1.6,
                }}
              >
                {SHOP.description}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {SHOP.verifiedBadges.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      color: '#5A9E3F',
                      background: 'rgba(90,158,63,0.1)',
                      border: '1px solid rgba(90,158,63,0.25)',
                      padding: '3px 9px',
                      borderRadius: 3,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                minWidth: 150,
              }}
            >
              {[
                ['Orders fulfilled', SHOP.totalOrders],
                ['Response rate', SHOP.responseRate],
                ['On-time delivery', SHOP.onTime],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 6,
                    padding: '10px 14px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: '#3A8FD4',
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(240,237,230,0.4)',
                      marginTop: 2,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COMPARE OTHER SUPPLIERS ── */}
        <div>
          <SectionHeader title="Compare Other Suppliers" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
              gap: 14,
            }}
          >
            {/* Current supplier (highlighted) */}
            <div
              style={{
                background: 'rgba(232,168,56,0.07)',
                border: '1.5px solid rgba(232,168,56,0.35)',
                borderRadius: 8,
                padding: '16px 18px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 16,
                  background: '#E8A838',
                  color: '#0D0D0D',
                  padding: '2px 10px',
                  borderRadius: 3,
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  fontFamily: "'Barlow Condensed',sans-serif",
                }}
              >
                VIEWING NOW
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                {SHOP.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(240,237,230,0.4)',
                  marginBottom: 10,
                }}
              >
                Chinchwad, Pune
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div
                    style={{ fontSize: 10, color: 'rgba(240,237,230,0.35)' }}
                  >
                    Price
                  </div>
                  <div
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: 20,
                      fontWeight: 900,
                      color: '#E8A838',
                    }}
                  >
                    ₹{pricePerKg}/kg
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#E8A838' }}>
                    ★ {SHOP.rating}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(240,237,230,0.4)' }}>
                    {PRODUCT.delivery}
                  </div>
                </div>
              </div>
            </div>

            {OTHER_SUPPLIERS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 8,
                  padding: '16px 18px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(58,143,212,0.3)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
                }
              >
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(240,237,230,0.4)',
                    marginBottom: 10,
                  }}
                >
                  {s.location}
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <div
                      style={{ fontSize: 10, color: 'rgba(240,237,230,0.35)' }}
                    >
                      Price
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 20,
                        fontWeight: 900,
                        color:
                          s.price < pricePerKg
                            ? '#5A9E3F'
                            : s.price > pricePerKg
                            ? '#E8503A'
                            : '#F0EDE6',
                      }}
                    >
                      ₹{s.price}/kg
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{ fontSize: 11, color: 'rgba(240,237,230,0.5)' }}
                    >
                      ★ {s.rating}
                    </div>
                    <div
                      style={{ fontSize: 10, color: 'rgba(240,237,230,0.4)' }}
                    >
                      {s.delivery}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        input::placeholder { color: rgba(240,237,230,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
