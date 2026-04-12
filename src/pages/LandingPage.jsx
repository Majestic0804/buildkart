import React from 'react';
import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  'How it works',
  'For contractors',
  'For suppliers',
  'Pricing',
];

const STATS = [
  { value: '2,400+', label: 'Material suppliers' },
  { value: '18,000+', label: 'Active contractors' },
  { value: '₹94Cr+', label: 'Orders fulfilled' },
  { value: '48hr', label: 'Avg. delivery time' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Post your requirement',
    desc: 'Contractors list what materials they need — quantity, grade, delivery timeline.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Get competitive quotes',
    desc: 'Verified local material shops send you their best prices instantly.',
    icon: '💬',
  },
  {
    step: '03',
    title: 'Compare & confirm',
    desc: 'Review ratings, price, and proximity. Lock in your order with one tap.',
    icon: '✅',
  },
  {
    step: '04',
    title: 'Track delivery',
    desc: 'Real-time updates from dispatch to your site gate.',
    icon: '🚚',
  },
];

const MATERIALS = [
  { name: 'Cement', tag: 'OPC 53 Grade', price: '₹380/bag' },
  { name: 'TMT Steel', tag: 'Fe 500D', price: '₹68/kg' },
  { name: 'Sand', tag: 'M-Sand', price: '₹1,200/ton' },
  { name: 'Bricks', tag: 'Clay / AAC', price: '₹8/pc' },
  { name: 'Aggregates', tag: '20mm / 40mm', price: '₹900/ton' },
  { name: 'Plywood', tag: 'BWR Grade', price: '₹1,800/sheet' },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Patil',
    role: 'Site Engineer, Pune',
    text: 'I used to spend half my morning calling suppliers. Now I post once and get 6 quotes in 20 minutes.',
    avatar: 'RP',
    color: '#E8A838',
  },
  {
    name: 'Suresh Building Materials',
    role: 'Supplier, Nashik',
    text: 'Our order volume doubled in 3 months. Buildkart connected us to contractors we never knew existed.',
    avatar: 'SB',
    color: '#3A8FD4',
  },
  {
    name: 'Kavita Constructions',
    role: 'Contractor, Mumbai',
    text: 'The price transparency alone is worth it. No more getting ripped off on last-minute orders.',
    avatar: 'KC',
    color: '#5A7F3E',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  const num = parseInt(target.replace(/[^0-9]/g, ''));
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, num]);
  const display = target.replace(/[0-9,]+/, count.toLocaleString('en-IN'));
  return <span ref={ref}>{inView ? display : '0'}</span>;
}

export default function LandingPage() {
  const [activeRole, setActiveRole] = useState('contractor');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [howRef, howInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [testimonialRef, testimonialInView] = useInView();

  return (
    <div
      style={{
        fontFamily: "'Barlow', sans-serif",
        background: '#0D0D0D',
        color: '#F0EDE6',
        overflowX: 'hidden',
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
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5vw',
          height: 64,
          background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              background: '#E8A838',
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1,
              color: '#F0EDE6',
            }}
          >
            BUILDKART
          </span>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: 'rgba(240,237,230,0.65)',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                letterSpacing: 0.3,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#F0EDE6')}
              onMouseLeave={(e) =>
                (e.target.style.color = 'rgba(240,237,230,0.65)')
              }
            >
              {l}
            </a>
          ))}
          <button
            style={{
              background: '#E8A838',
              color: '#0D0D0D',
              border: 'none',
              borderRadius: 4,
              padding: '9px 20px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.5,
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.background = '#F5BE5C')}
            onMouseLeave={(e) => (e.target.style.background = '#E8A838')}
          >
            GET STARTED
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 5vw 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `
            linear-gradient(rgba(232,168,56,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,168,56,0.04) 1px, transparent 1px)
          `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Accent blobs */}
        <div
          style={{
            position: 'absolute',
            right: '-10vw',
            top: '10%',
            width: '55vw',
            height: '55vw',
            maxWidth: 700,
            background:
              'radial-gradient(circle, rgba(232,168,56,0.12) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-5vw',
            bottom: '5%',
            width: '30vw',
            height: '30vw',
            background:
              'radial-gradient(circle, rgba(58,143,212,0.08) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 780 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(232,168,56,0.12)',
              border: '1px solid rgba(232,168,56,0.3)',
              borderRadius: 3,
              padding: '5px 14px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1.5,
              color: '#E8A838',
              marginBottom: 28,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#E8A838',
                display: 'inline-block',
              }}
            />
            BUILT FOR THE CONSTRUCTION INDUSTRY
          </div>

          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(52px, 8vw, 100px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: -1,
              margin: '0 0 28px',
              color: '#F0EDE6',
            }}
          >
            GET MATERIALS.
            <br />
            <span style={{ color: '#E8A838' }}>SKIP THE</span>
            <br />
            MIDDLEMEN.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: 'rgba(240,237,230,0.6)',
              maxWidth: 520,
              lineHeight: 1.65,
              margin: '0 0 44px',
              fontWeight: 400,
            }}
          >
            Buildkart connects construction contractors directly to verified
            local material shops — cement, steel, aggregates and more. Compare
            prices, place orders, track delivery.
          </p>

          {/* Role toggle + CTA */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxWidth: 480,
            }}
          >
            <div
              style={{
                display: 'flex',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: 4,
              }}
            >
              {['contractor', 'supplier'].map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    background: activeRole === role ? '#E8A838' : 'transparent',
                    color:
                      activeRole === role ? '#0D0D0D' : 'rgba(240,237,230,0.5)',
                    border: 'none',
                    borderRadius: 4,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textTransform: 'uppercase',
                  }}
                >
                  {role === 'contractor'
                    ? "I'm a Contractor"
                    : "I'm a Supplier"}
                </button>
              ))}
            </div>

            <button
              style={{
                background: activeRole === 'contractor' ? '#E8A838' : '#3A8FD4',
                color: '#0D0D0D',
                border: 'none',
                borderRadius: 4,
                padding: '16px 32px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 1,
                fontFamily: "'Barlow Condensed', sans-serif",
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {activeRole === 'contractor'
                ? 'FIND MATERIALS NEAR YOUR SITE →'
                : 'LIST YOUR SHOP & START SELLING →'}
            </button>

            <p
              style={{
                fontSize: 12,
                color: 'rgba(240,237,230,0.35)',
                margin: 0,
              }}
            >
              Free to join · No hidden charges · Verified suppliers only
            </p>
          </div>
        </div>

        {/* Floating material tags */}
        <div
          style={{
            position: 'absolute',
            right: '5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 1,
          }}
        >
          {MATERIALS.map((m, i) => (
            <div
              key={m.name}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                backdropFilter: 'blur(8px)',
                animation: `floatIn 0.5s ease ${i * 0.08}s both`,
                minWidth: 200,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE6' }}
                >
                  {m.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(240,237,230,0.4)',
                    marginTop: 2,
                  }}
                >
                  {m.tag}
                </div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#E8A838',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {m.price}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes floatIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* ── STATS STRIP ── */}
      <section
        ref={statsRef}
        style={{
          background: '#E8A838',
          padding: '36px 5vw',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 900,
                color: '#0D0D0D',
                lineHeight: 1,
              }}
            >
              {statsInView ? <AnimatedCounter target={s.value} /> : '0'}
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'rgba(13,13,13,0.65)',
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        ref={howRef}
        style={{ padding: '100px 5vw', maxWidth: 1200, margin: '0 auto' }}
      >
        <div style={{ marginBottom: 60 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#E8A838',
              marginBottom: 12,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            HOW IT WORKS
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
              color: '#F0EDE6',
            }}
          >
            FROM REQUIREMENT
            <br />
            TO DELIVERY IN 4 STEPS
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 2,
          }}
        >
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={item.step}
              style={{
                background:
                  i % 2 === 0
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(232,168,56,0.06)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '40px 32px',
                transition: 'transform 0.2s, background 0.2s',
                opacity: howInView ? 1 : 0,
                transform: howInView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${
                  i * 0.12
                }s, transform 0.5s ease ${i * 0.12}s`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(232,168,56,0.1)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  i % 2 === 0
                    ? 'rgba(255,255,255,0.03)'
                    : 'rgba(232,168,56,0.06)')
              }
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 64,
                  fontWeight: 900,
                  color: 'rgba(232,168,56,0.15)',
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {item.step}
              </div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 22,
                  fontWeight: 800,
                  margin: '0 0 12px',
                  color: '#F0EDE6',
                  letterSpacing: 0.5,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(240,237,230,0.55)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DUAL CTA SPLIT ── */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          margin: '0 5vw 80px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {/* Contractor side */}
        <div
          style={{
            padding: '60px 48px',
            background: 'rgba(232,168,56,0.06)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 160,
              height: 160,
              background:
                'radial-gradient(circle, rgba(232,168,56,0.15) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#E8A838',
              marginBottom: 16,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            FOR CONTRACTORS
          </div>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 36,
              fontWeight: 900,
              margin: '0 0 16px',
              lineHeight: 1.1,
            }}
          >
            Stop wasting hours
            <br />
            chasing quotes
          </h3>
          <ul style={{ padding: 0, margin: '0 0 32px', listStyle: 'none' }}>
            {[
              'Post requirements in 2 minutes',
              'Get 5+ competitive quotes',
              'Track material delivery live',
              'Verified suppliers, guaranteed quality',
            ].map((item) => (
              <li
                key={item}
                style={{
                  fontSize: 14,
                  color: 'rgba(240,237,230,0.65)',
                  padding: '7px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ color: '#E8A838', fontSize: 16 }}>›</span> {item}
              </li>
            ))}
          </ul>
          <button
            style={{
              background: '#E8A838',
              color: '#0D0D0D',
              border: 'none',
              borderRadius: 4,
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            JOIN AS CONTRACTOR →
          </button>
        </div>

        {/* Supplier side */}
        <div
          style={{
            padding: '60px 48px',
            background: 'rgba(58,143,212,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 160,
              height: 160,
              background:
                'radial-gradient(circle, rgba(58,143,212,0.12) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#3A8FD4',
              marginBottom: 16,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            FOR MATERIAL SUPPLIERS
          </div>
          <h3
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 36,
              fontWeight: 900,
              margin: '0 0 16px',
              lineHeight: 1.1,
            }}
          >
            Reach more sites,
            <br />
            sell more stock
          </h3>
          <ul style={{ padding: 0, margin: '0 0 32px', listStyle: 'none' }}>
            {[
              'Free shop listing & profile',
              'Get leads from nearby contractors',
              'Manage orders from one dashboard',
              'Build reviews & grow your reputation',
            ].map((item) => (
              <li
                key={item}
                style={{
                  fontSize: 14,
                  color: 'rgba(240,237,230,0.65)',
                  padding: '7px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <span style={{ color: '#3A8FD4', fontSize: 16 }}>›</span> {item}
              </li>
            ))}
          </ul>
          <button
            style={{
              background: '#3A8FD4',
              color: '#0D0D0D',
              border: 'none',
              borderRadius: 4,
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.8,
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            LIST YOUR SHOP →
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        ref={testimonialRef}
        style={{ padding: '80px 5vw', background: 'rgba(255,255,255,0.02)' }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#E8A838',
            marginBottom: 12,
            textAlign: 'center',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
        >
          WHAT THEY SAY
        </div>
        <h2
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            textAlign: 'center',
            margin: '0 0 56px',
          }}
        >
          TRUSTED ON SITES
          <br />
          ACROSS INDIA
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 6,
                padding: '32px 28px',
                opacity: testimonialInView ? 1 : 0,
                transform: testimonialInView
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                transition: `opacity 0.5s ease ${
                  i * 0.15
                }s, transform 0.5s ease ${i * 0.15}s`,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: t.color,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  marginBottom: 16,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'rgba(240,237,230,0.75)',
                  margin: '0 0 24px',
                }}
              >
                {t.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: t.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0D0D0D',
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE6' }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(240,237,230,0.4)',
                      marginTop: 2,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          padding: '100px 5vw',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(232,168,56,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,168,56,0.06) 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 900,
              margin: '0 0 20px',
              lineHeight: 1,
            }}
          >
            YOUR NEXT SITE STARTS
            <br />
            <span style={{ color: '#E8A838' }}>WITH BETTER MATERIALS.</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(240,237,230,0.5)',
              margin: '0 auto 40px',
              maxWidth: 480,
            }}
          >
            Join thousands of contractors and suppliers already building
            smarter.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              style={{
                background: '#E8A838',
                color: '#0D0D0D',
                border: 'none',
                borderRadius: 4,
                padding: '16px 36px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 1,
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              START AS CONTRACTOR
            </button>
            <button
              style={{
                background: 'transparent',
                color: '#F0EDE6',
                border: '1px solid rgba(240,237,230,0.25)',
                borderRadius: 4,
                padding: '16px 36px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 1,
                fontFamily: "'Barlow Condensed', sans-serif",
              }}
            >
              LIST YOUR SHOP
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: '32px 5vw',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          BUILDKART
        </div>
        <div style={{ fontSize: 12, color: 'rgba(240,237,230,0.3)' }}>
          © 2026 Buildkart. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 12,
                color: 'rgba(240,237,230,0.4)',
                textDecoration: 'none',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
