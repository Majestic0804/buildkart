import React from 'react';
import { useState } from 'react';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const SUPPLIERS_TO_RATE = [
  {
    id: 1,
    orderId: 'BK-4799',
    shop: 'Nashik Aggregates Co.',
    badge: 'NA',
    color: '#9B6BFF',
    material: 'M-Sand (Washed)',
    qty: '12 tons',
    delivered: 'Apr 6, 2026',
    amount: '₹14,400',
    rated: false,
  },
  {
    id: 2,
    orderId: 'BK-4780',
    shop: 'Nashik Aggregates Co.',
    badge: 'NA',
    color: '#9B6BFF',
    material: '20mm Aggregates',
    qty: '20 tons',
    delivered: 'Apr 3, 2026',
    amount: '₹18,000',
    rated: false,
  },
];

const ALL_REVIEWS = [
  {
    id: 1,
    shop: 'Sharma Building Supplies',
    badge: 'SB',
    color: '#E8A838',
    material: 'OPC 53 Cement',
    orderId: 'BK-4701',
    rating: 5,
    date: 'Mar 2026',
    tags: ['On time', 'Great quality', 'Good communication'],
    text: 'Excellent cement quality. Fresh stock, delivered exactly on time. Will order again for our next phase.',
    helpful: 4,
  },
  {
    id: 2,
    shop: 'Rathi Steels Pvt Ltd',
    badge: 'RS',
    color: '#3A8FD4',
    material: 'TMT Steel Fe500D',
    orderId: 'BK-4650',
    rating: 4,
    date: 'Feb 2026',
    tags: ['Good quality', 'Slight delay'],
    text: 'Steel quality was excellent — TATA Tiscon as promised. Delivery was half a day late but supplier communicated proactively.',
    helpful: 2,
  },
  {
    id: 3,
    shop: 'Nashik Aggregates Co.',
    badge: 'NA',
    color: '#9B6BFF',
    material: 'River Sand',
    orderId: 'BK-4580',
    rating: 5,
    date: 'Jan 2026',
    tags: ['Best price', 'On time', 'Bulk order friendly'],
    text: 'Best aggregates supplier in Pune-Nashik region. Handled 30 ton order without any issues. Highly recommend.',
    helpful: 7,
  },
];

const RATING_CATEGORIES = [
  { id: 'quality', label: 'Material Quality', icon: '🏗️' },
  { id: 'delivery', label: 'Delivery Speed', icon: '🚚' },
  { id: 'communication', label: 'Communication', icon: '💬' },
  { id: 'packaging', label: 'Packaging', icon: '📦' },
];

const QUICK_TAGS = [
  'On time',
  'Great quality',
  'Good communication',
  'Best price',
  'Bulk order friendly',
  'Fresh stock',
  'Recommended',
  'Professional',
  'Slight delay',
  'Would order again',
];

// ─── Star Selector ────────────────────────────────────────────────────────────
function StarSelector({ value, onChange, size = 32 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: size,
            lineHeight: 1,
            padding: 2,
            color:
              star <= (hovered || value) ? '#E8A838' : 'rgba(255,255,255,0.15)',
            transition: 'all 0.1s',
            transform: star <= (hovered || value) ? 'scale(1.15)' : 'scale(1)',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ─── Rating Display (read-only stars) ────────────────────────────────────────
function RatingDisplay({ value, size = 13 }) {
  return (
    <span style={{ color: '#E8A838', fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(Math.floor(value))}
      {'☆'.repeat(5 - Math.floor(value))}
    </span>
  );
}

// ─── Rating Bar ───────────────────────────────────────────────────────────────
function RatingBar({ label, value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 14,
      }}
    >
      <span
        style={{ fontSize: 12, color: 'rgba(240,237,230,0.55)', minWidth: 150 }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background:
                s <= value ? 'rgba(232,168,56,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${
                s <= value ? '#E8A838' : 'rgba(255,255,255,0.1)'
              }`,
              color: s <= value ? '#E8A838' : 'rgba(240,237,230,0.25)',
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ★
          </button>
        ))}
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          minWidth: 40,
          color: value ? '#E8A838' : 'rgba(240,237,230,0.25)',
          fontFamily: "'Barlow Condensed',sans-serif",
        }}
      >
        {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][value] || ''}
      </span>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({ review, onHelpful }) {
  const [marked, setMarked] = useState(false);
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: '20px 22px',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = 'rgba(232,168,56,0.2)')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')
      }
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: review.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 800,
              color: '#0D0D0D',
              fontFamily: "'Barlow Condensed',sans-serif",
              flexShrink: 0,
            }}
          >
            {review.badge}
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#F0EDE6',
                marginBottom: 2,
              }}
            >
              {review.shop}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(240,237,230,0.4)' }}>
              {review.material} · {review.orderId}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <RatingDisplay value={review.rating} />
          <div
            style={{
              fontSize: 10,
              color: 'rgba(240,237,230,0.3)',
              marginTop: 3,
            }}
          >
            {review.date}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p
        style={{
          fontSize: 14,
          color: 'rgba(240,237,230,0.72)',
          lineHeight: 1.7,
          margin: '0 0 14px',
        }}
      >
        {review.text}
      </p>

      {/* Tags */}
      <div
        style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}
      >
        {review.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: 0.3,
              color: '#E8A838',
              background: 'rgba(232,168,56,0.1)',
              border: '1px solid rgba(232,168,56,0.2)',
              padding: '3px 9px',
              borderRadius: 3,
              fontFamily: "'Barlow Condensed',sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Helpful */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingTop: 10,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span style={{ fontSize: 11, color: 'rgba(240,237,230,0.35)' }}>
          Was this helpful?
        </span>
        <button
          onClick={() => {
            if (!marked) {
              onHelpful(review.id);
              setMarked(true);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '4px 10px',
            background: marked
              ? 'rgba(90,158,63,0.1)'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${
              marked ? 'rgba(90,158,63,0.3)' : 'rgba(255,255,255,0.08)'
            }`,
            borderRadius: 4,
            color: marked ? '#5A9E3F' : 'rgba(240,237,230,0.4)',
            fontSize: 11,
            cursor: marked ? 'default' : 'pointer',
            fontFamily: "'Barlow',sans-serif",
            transition: 'all 0.2s',
          }}
        >
          👍 {review.helpful + (marked ? 1 : 0)}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReviewsRatings() {
  const [pendingSuppliers, setPendingSuppliers] = useState(SUPPLIERS_TO_RATE);
  const [myReviews, setMyReviews] = useState(ALL_REVIEWS);
  const [activeTab, setActiveTab] = useState('pending'); // pending | my_reviews
  const [reviewingId, setReviewingId] = useState(null);
  const [helpfulMap, setHelpfulMap] = useState({});

  // Review form state
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({
    quality: 0,
    delivery: 0,
    communication: 0,
    packaging: 0,
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reviewing = pendingSuppliers.find((s) => s.id === reviewingId);

  function toggleTag(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function submitReview() {
    if (!overallRating) return;
    const newReview = {
      id: Date.now(),
      shop: reviewing.shop,
      badge: reviewing.badge,
      color: reviewing.color,
      material: reviewing.material,
      orderId: reviewing.orderId,
      rating: overallRating,
      date: 'Apr 2026',
      tags: selectedTags,
      text: reviewText || 'Good experience overall.',
      helpful: 0,
    };
    setMyReviews((prev) => [newReview, ...prev]);
    setPendingSuppliers((prev) =>
      prev.map((s) => (s.id === reviewingId ? { ...s, rated: true } : s))
    );
    setSubmitted(true);
  }

  function closeReview() {
    setReviewingId(null);
    setOverallRating(0);
    setCategoryRatings({
      quality: 0,
      delivery: 0,
      communication: 0,
      packaging: 0,
    });
    setSelectedTags([]);
    setReviewText('');
    setSubmitted(false);
  }

  function handleHelpful(id) {
    setMyReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  }

  const pendingCount = pendingSuppliers.filter((s) => !s.rated).length;

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
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: 56,
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: '#0A0A0A',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 4px' }}>
            ›
          </span>
          <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.45)' }}>
            Reviews & Ratings
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
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
            RP
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Rajesh Patil</span>
        </div>
      </header>

      <div
        style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px 80px' }}
      >
        {/* ── PAGE TITLE ── */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 'clamp(32px,5vw,52px)',
              fontWeight: 900,
              margin: '0 0 8px',
              lineHeight: 1,
            }}
          >
            Reviews & Ratings
          </h1>
          <p
            style={{ fontSize: 14, color: 'rgba(240,237,230,0.45)', margin: 0 }}
          >
            Your feedback helps other contractors make better decisions.
          </p>
        </div>

        {/* ── TABS ── */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            marginBottom: 28,
          }}
        >
          {[
            { id: 'pending', label: 'Pending Reviews', count: pendingCount },
            { id: 'my_reviews', label: 'My Reviews', count: myReviews.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                border: 'none',
                background: 'transparent',
                color:
                  activeTab === tab.id ? '#E8A838' : 'rgba(240,237,230,0.45)',
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 0.8,
                cursor: 'pointer',
                textTransform: 'uppercase',
                borderBottom: `2px solid ${
                  activeTab === tab.id ? '#E8A838' : 'transparent'
                }`,
                marginBottom: -1,
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  style={{
                    background:
                      activeTab === tab.id
                        ? '#E8A838'
                        : 'rgba(255,255,255,0.1)',
                    color:
                      activeTab === tab.id
                        ? '#0D0D0D'
                        : 'rgba(240,237,230,0.5)',
                    borderRadius: 10,
                    padding: '1px 7px',
                    fontSize: 11,
                    fontWeight: 800,
                    fontFamily: "'Barlow Condensed',sans-serif",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── PENDING REVIEWS TAB ── */}
        {activeTab === 'pending' && (
          <div>
            {pendingCount === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 0',
                  color: 'rgba(240,237,230,0.3)',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 24,
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  All caught up!
                </div>
                <div style={{ fontSize: 14 }}>
                  No pending reviews. Check back after your next delivery.
                </div>
              </div>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {pendingSuppliers
                  .filter((s) => !s.rated)
                  .map((supplier) => (
                    <div
                      key={supplier.id}
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(232,168,56,0.2)',
                        borderRadius: 10,
                        padding: '20px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                      }}
                    >
                      {/* Shop avatar */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          flexShrink: 0,
                          background: supplier.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          fontWeight: 800,
                          color: '#0D0D0D',
                          fontFamily: "'Barlow Condensed',sans-serif",
                        }}
                      >
                        {supplier.badge}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontSize: 15, fontWeight: 700 }}>
                            {supplier.shop}
                          </span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              letterSpacing: 0.5,
                              color: '#5A9E3F',
                              background: 'rgba(90,158,63,0.12)',
                              border: '1px solid rgba(90,158,63,0.25)',
                              padding: '2px 7px',
                              borderRadius: 3,
                              fontFamily: "'Barlow Condensed',sans-serif",
                            }}
                          >
                            DELIVERED
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: 'rgba(240,237,230,0.5)',
                            marginBottom: 2,
                          }}
                        >
                          {supplier.material} · {supplier.qty} ·{' '}
                          {supplier.amount}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'rgba(240,237,230,0.3)',
                          }}
                        >
                          Delivered {supplier.delivered} · {supplier.orderId}
                        </div>
                      </div>

                      {/* CTA */}
                      <button
                        onClick={() => setReviewingId(supplier.id)}
                        style={{
                          background: '#E8A838',
                          color: '#0D0D0D',
                          border: 'none',
                          borderRadius: 6,
                          padding: '11px 20px',
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: 13,
                          fontWeight: 800,
                          letterSpacing: 0.5,
                          cursor: 'pointer',
                          flexShrink: 0,
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.target.style.opacity = '1')}
                      >
                        ★ WRITE REVIEW
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ── MY REVIEWS TAB ── */}
        {activeTab === 'my_reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {myReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onHelpful={handleHelpful}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── REVIEW MODAL ── */}
      {reviewingId && reviewing && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.82)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !submitted) closeReview();
          }}
        >
          <div
            style={{
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '32px 36px',
              width: '100%',
              maxWidth: 560,
              animation: 'slideUp 0.25s ease',
              margin: 'auto',
            }}
          >
            {submitted ? (
              /* ── SUCCESS STATE ── */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>⭐</div>
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 28,
                    fontWeight: 900,
                    margin: '0 0 8px',
                    color: '#E8A838',
                  }}
                >
                  Review Submitted!
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(240,237,230,0.5)',
                    margin: '0 0 28px',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you for rating{' '}
                  <strong style={{ color: '#F0EDE6' }}>{reviewing.shop}</strong>
                  . Your review helps other contractors make better decisions.
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    marginBottom: 28,
                  }}
                >
                  {'★'
                    .repeat(overallRating)
                    .split('')
                    .map((s, i) => (
                      <span key={i} style={{ fontSize: 28, color: '#E8A838' }}>
                        ★
                      </span>
                    ))}
                </div>
                <button
                  onClick={closeReview}
                  style={{
                    background: '#E8A838',
                    color: '#0D0D0D',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 32px',
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    cursor: 'pointer',
                  }}
                >
                  DONE
                </button>
              </div>
            ) : (
              /* ── REVIEW FORM ── */
              <>
                {/* Header */}
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
                        fontSize: 22,
                        fontWeight: 900,
                      }}
                    >
                      Rate Your Experience
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: 'rgba(240,237,230,0.4)',
                      }}
                    >
                      Order {reviewing.orderId} · {reviewing.material}
                    </p>
                  </div>
                  <button
                    onClick={closeReview}
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

                {/* Supplier info strip */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 8,
                    padding: '12px 14px',
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: reviewing.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#0D0D0D',
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    {reviewing.badge}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {reviewing.shop}
                    </div>
                    <div
                      style={{ fontSize: 11, color: 'rgba(240,237,230,0.4)' }}
                    >
                      {reviewing.material} · {reviewing.qty} · Delivered{' '}
                      {reviewing.delivered}
                    </div>
                  </div>
                </div>

                {/* Overall rating */}
                <div style={{ marginBottom: 24 }}>
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
                    OVERALL RATING
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                  >
                    <StarSelector
                      value={overallRating}
                      onChange={setOverallRating}
                      size={36}
                    />
                    {overallRating > 0 && (
                      <span
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#E8A838',
                          animation: 'fadeUp 0.2s ease',
                        }}
                      >
                        {
                          ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][
                            overallRating
                          ]
                        }
                      </span>
                    )}
                  </div>
                </div>

                {/* Category ratings */}
                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.4)',
                      marginBottom: 14,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    RATE EACH ASPECT
                  </div>
                  {RATING_CATEGORIES.map((cat) => (
                    <RatingBar
                      key={cat.id}
                      label={`${cat.icon} ${cat.label}`}
                      value={categoryRatings[cat.id]}
                      onChange={(val) =>
                        setCategoryRatings((prev) => ({
                          ...prev,
                          [cat.id]: val,
                        }))
                      }
                    />
                  ))}
                </div>

                {/* Quick tags */}
                <div style={{ marginBottom: 24 }}>
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
                    QUICK TAGS (select all that apply)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {QUICK_TAGS.map((tag) => {
                      const selected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          style={{
                            padding: '6px 12px',
                            background: selected
                              ? 'rgba(232,168,56,0.15)'
                              : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${
                              selected ? '#E8A838' : 'rgba(255,255,255,0.1)'
                            }`,
                            borderRadius: 20,
                            cursor: 'pointer',
                            color: selected
                              ? '#E8A838'
                              : 'rgba(240,237,230,0.5)',
                            fontSize: 12,
                            fontWeight: selected ? 600 : 400,
                            transition: 'all 0.15s',
                            fontFamily: "'Barlow',sans-serif",
                          }}
                        >
                          {selected ? '✓ ' : ''}
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Review text */}
                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      color: 'rgba(240,237,230,0.4)',
                      marginBottom: 10,
                      fontFamily: "'Barlow Condensed',sans-serif",
                    }}
                  >
                    YOUR REVIEW (optional)
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with other contractors..."
                    rows={4}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 6,
                      padding: '12px 14px',
                      fontSize: 13,
                      color: '#F0EDE6',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: "'Barlow',sans-serif",
                      lineHeight: 1.6,
                      minHeight: 100,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(240,237,230,0.25)',
                      marginTop: 4,
                      textAlign: 'right',
                    }}
                  >
                    {reviewText.length}/500
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={submitReview}
                  disabled={!overallRating}
                  style={{
                    width: '100%',
                    padding: '15px',
                    background: overallRating
                      ? '#E8A838'
                      : 'rgba(255,255,255,0.06)',
                    color: overallRating ? '#0D0D0D' : 'rgba(240,237,230,0.25)',
                    border: 'none',
                    borderRadius: 6,
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: 1,
                    cursor: overallRating ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  {overallRating
                    ? `SUBMIT ${overallRating}★ REVIEW →`
                    : 'SELECT A RATING TO CONTINUE'}
                </button>

                {!overallRating && (
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      color: 'rgba(240,237,230,0.25)',
                      margin: '10px 0 0',
                    }}
                  >
                    Overall rating is required
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(6px);  } to { opacity:1; transform:translateY(0); } }
        textarea::placeholder { color: rgba(240,237,230,0.2); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}
