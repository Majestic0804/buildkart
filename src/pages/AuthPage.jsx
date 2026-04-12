import React from 'react';
import { useState } from 'react';

const ROLES = [
  {
    id: 'contractor',
    label: 'Contractor',
    icon: '🏗️',
    desc: 'Find & order materials for your sites',
    color: '#E8A838',
    fields: [
      'Full name',
      'Company name',
      'Phone number',
      'City / Site location',
    ],
  },
  {
    id: 'supplier',
    label: 'Material Supplier',
    icon: '🏭',
    desc: 'List your shop & receive bulk orders',
    color: '#3A8FD4',
    fields: ['Shop name', 'Owner name', 'Phone number', 'Shop address'],
  },
];

const STEPS_REGISTER = ['Role', 'Details', 'Verify'];

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  accent,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
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
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${focused ? accent : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 4,
          padding: '13px 16px',
          fontSize: 15,
          color: '#F0EDE6',
          outline: 'none',
          fontFamily: "'Barlow', sans-serif",
          transition: 'border-color 0.2s',
          caretColor: accent,
        }}
      />
    </div>
  );
}

function StepIndicator({ steps, current, color }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        marginBottom: 36,
      }}
    >
      {steps.map((s, i) => (
        <div
          key={s}
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: i < steps.length - 1 ? 1 : 'none',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background:
                i < current
                  ? color
                  : i === current
                  ? color
                  : 'rgba(255,255,255,0.08)',
              border: `2px solid ${
                i <= current ? color : 'rgba(255,255,255,0.12)'
              }`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: i <= current ? '#0D0D0D' : 'rgba(240,237,230,0.3)',
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: 'all 0.3s',
              flexShrink: 0,
            }}
          >
            {i < current ? '✓' : i + 1}
          </div>
          <div
            style={{
              fontSize: 11,
              color: i === current ? '#F0EDE6' : 'rgba(240,237,230,0.35)',
              marginLeft: 6,
              marginRight: 6,
              whiteSpace: 'nowrap',
            }}
          >
            {s}
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 1,
                background: i < current ? color : 'rgba(255,255,255,0.1)',
                margin: '0 8px',
                transition: 'background 0.3s',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login | register
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({});
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPass, setShowPass] = useState(false);

  const accent = role === 'supplier' ? '#3A8FD4' : '#E8A838';
  const selectedRole = ROLES.find((r) => r.id === role);

  function handleOtp(val, idx) {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  }

  const bgGrid = {
    backgroundImage: `
      linear-gradient(rgba(232,168,56,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,168,56,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
  };

  return (
    <div
      style={{
        fontFamily: "'Barlow', sans-serif",
        background: '#0D0D0D',
        color: '#F0EDE6',
        minHeight: '100vh',
        display: 'flex',
        ...bgGrid,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ── LEFT PANEL ── */}
      <div
        style={{
          width: '42%',
          minHeight: '100vh',
          background: 'rgba(255,255,255,0.02)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-20%',
            width: '80%',
            height: '60%',
            background: `radial-gradient(circle, ${
              role === 'supplier'
                ? 'rgba(58,143,212,0.10)'
                : 'rgba(232,168,56,0.10)'
            } 0%, transparent 70%)`,
            transition: 'background 0.4s',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: '#E8A838',
              clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)',
            }}
          />
          <span
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            BUILDKART
          </span>
        </div>

        {/* Middle content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(38px, 4vw, 58px)',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            {mode === 'login' ? (
              <>
                WELCOME
                <br />
                <span style={{ color: accent }}>BACK.</span>
              </>
            ) : (
              <>
                JOIN THE
                <br />
                <span style={{ color: accent }}>PLATFORM.</span>
              </>
            )}
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(240,237,230,0.5)',
              lineHeight: 1.7,
              maxWidth: 300,
            }}
          >
            {mode === 'login'
              ? 'Log back into your Buildkart account and get back to building.'
              : 'Connect with verified suppliers or reach more contractors — all in one place.'}
          </p>

          {/* Role cards on left panel */}
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {ROLES.map((r) => (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px 20px',
                  background:
                    role === r.id ? `${r.color}15` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${
                    role === r.id ? r.color + '50' : 'rgba(255,255,255,0.07)'
                  }`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setRole(r.id);
                  if (mode === 'register' && step === 0) setStep(1);
                }}
              >
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: role === r.id ? r.color : '#F0EDE6',
                    }}
                  >
                    {r.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(240,237,230,0.4)',
                      marginTop: 2,
                    }}
                  >
                    {r.desc}
                  </div>
                </div>
                {role === r.id && (
                  <div
                    style={{
                      marginLeft: 'auto',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: r.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      color: '#0D0D0D',
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div style={{ fontSize: 12, color: 'rgba(240,237,230,0.2)' }}>
          Trusted by 18,000+ contractors across India
        </div>
      </div>

      {/* ── RIGHT PANEL (FORM) ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 5vw',
        }}
      >
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Mode toggle */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              padding: 4,
              marginBottom: 40,
            }}
          >
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setStep(0);
                  setRole(null);
                }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  background: mode === m ? '#E8A838' : 'transparent',
                  color: mode === m ? '#0D0D0D' : 'rgba(240,237,230,0.45)',
                  border: 'none',
                  borderRadius: 4,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                }}
              >
                {m === 'login' ? 'Log In' : 'Register'}
              </button>
            ))}
          </div>

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  margin: '0 0 6px',
                }}
              >
                Sign in to your account
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(240,237,230,0.4)',
                  margin: '0 0 32px',
                }}
              >
                Enter your phone number to continue
              </p>

              <InputField
                label="Phone number"
                type="tel"
                placeholder="+91 98765 43210"
                accent={accent}
              />
              <div style={{ position: 'relative' }}>
                <InputField
                  label="Password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  accent={accent}
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 38,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: 'rgba(240,237,230,0.4)',
                    fontFamily: "'Barlow', sans-serif",
                  }}
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 28,
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    cursor: 'pointer',
                  }}
                >
                  <input type="checkbox" style={{ accentColor: '#E8A838' }} />
                  <span
                    style={{ fontSize: 12, color: 'rgba(240,237,230,0.45)' }}
                  >
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: '#E8A838',
                    textDecoration: 'none',
                  }}
                >
                  Forgot password?
                </a>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '15px',
                  background: role === 'supplier' ? '#3A8FD4' : '#E8A838',
                  color: '#0D0D0D',
                  border: 'none',
                  borderRadius: 4,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: 1,
                  cursor: 'pointer',
                  marginBottom: 16,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                LOG IN →
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  margin: '24px 0',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
                <span style={{ fontSize: 12, color: 'rgba(240,237,230,0.3)' }}>
                  or continue with
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '13px',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#F0EDE6',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>📱</span> Login with OTP
              </button>
            </div>
          )}

          {/* ── REGISTER FLOW ── */}
          {mode === 'register' && (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              {step > 0 && (
                <StepIndicator
                  steps={STEPS_REGISTER}
                  current={step}
                  color={accent}
                />
              )}

              {/* Step 0: Choose role */}
              {step === 0 && (
                <>
                  <h2
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 28,
                      fontWeight: 900,
                      margin: '0 0 6px',
                    }}
                  >
                    Create your account
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(240,237,230,0.4)',
                      margin: '0 0 28px',
                    }}
                  >
                    Who are you joining as?
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                    }}
                  >
                    {ROLES.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setRole(r.id);
                          setStep(1);
                        }}
                        style={{
                          padding: '20px 24px',
                          border: `1.5px solid rgba(255,255,255,0.1)`,
                          borderRadius: 6,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          transition: 'all 0.2s',
                          background: 'rgba(255,255,255,0.03)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = r.color;
                          e.currentTarget.style.background = `${r.color}10`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            'rgba(255,255,255,0.1)';
                          e.currentTarget.style.background =
                            'rgba(255,255,255,0.03)';
                        }}
                      >
                        <span style={{ fontSize: 32 }}>{r.icon}</span>
                        <div>
                          <div
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              fontFamily: "'Barlow Condensed', sans-serif",
                              letterSpacing: 0.5,
                            }}
                          >
                            {r.label}
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              color: 'rgba(240,237,230,0.45)',
                              marginTop: 3,
                            }}
                          >
                            {r.desc}
                          </div>
                        </div>
                        <div
                          style={{
                            marginLeft: 'auto',
                            fontSize: 20,
                            color: 'rgba(240,237,230,0.2)',
                          }}
                        >
                          ›
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Step 1: Fill Details */}
              {step === 1 && selectedRole && (
                <>
                  <h2
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 26,
                      fontWeight: 900,
                      margin: '0 0 4px',
                    }}
                  >
                    Your details
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(240,237,230,0.4)',
                      margin: '0 0 28px',
                    }}
                  >
                    Registering as{' '}
                    <span style={{ color: accent, fontWeight: 600 }}>
                      {selectedRole.label}
                    </span>
                  </p>

                  {selectedRole.fields.map((field) => (
                    <InputField
                      key={field}
                      label={field}
                      placeholder={`Enter ${field.toLowerCase()}`}
                      accent={accent}
                      value={form[field] || ''}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  ))}

                  <div style={{ position: 'relative' }}>
                    <InputField
                      label="Password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      accent={accent}
                    />
                    <button
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'absolute',
                        right: 14,
                        top: 38,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 12,
                        color: 'rgba(240,237,230,0.4)',
                      }}
                    >
                      {showPass ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button
                      onClick={() => setStep(0)}
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
                      onClick={() => setStep(2)}
                      style={{
                        flex: 2,
                        padding: '13px',
                        background: accent,
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
                      VERIFY PHONE →
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {step === 2 && (
                <>
                  <h2
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 26,
                      fontWeight: 900,
                      margin: '0 0 6px',
                    }}
                  >
                    Verify your number
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(240,237,230,0.4)',
                      margin: '0 0 32px',
                      lineHeight: 1.6,
                    }}
                  >
                    We sent a 6-digit code to your phone.
                    <br />
                    <span style={{ color: accent }}>+91 98765 43210</span>
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      marginBottom: 32,
                      justifyContent: 'center',
                    }}
                  >
                    {otp.map((val, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtp(e.target.value, i)}
                        style={{
                          width: 52,
                          height: 60,
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.05)',
                          border: `1.5px solid ${
                            val ? accent : 'rgba(255,255,255,0.12)'
                          }`,
                          borderRadius: 6,
                          fontSize: 24,
                          fontWeight: 700,
                          color: '#F0EDE6',
                          outline: 'none',
                          caretColor: accent,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          transition: 'border-color 0.2s',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    style={{
                      width: '100%',
                      padding: '15px',
                      background: accent,
                      color: '#0D0D0D',
                      border: 'none',
                      borderRadius: 4,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: 1,
                      cursor: 'pointer',
                      marginBottom: 16,
                    }}
                  >
                    CONFIRM & CREATE ACCOUNT
                  </button>

                  <div style={{ textAlign: 'center' }}>
                    <span
                      style={{ fontSize: 12, color: 'rgba(240,237,230,0.35)' }}
                    >
                      Didn't receive code?{' '}
                    </span>
                    <a
                      href="#"
                      style={{
                        fontSize: 12,
                        color: accent,
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Resend in 30s
                    </a>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    style={{
                      display: 'block',
                      margin: '20px auto 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      color: 'rgba(240,237,230,0.4)',
                      fontFamily: "'Barlow', sans-serif",
                    }}
                  >
                    ← Change details
                  </button>
                </>
              )}
            </div>
          )}

          {/* Terms */}
          <p
            style={{
              fontSize: 11,
              color: 'rgba(240,237,230,0.25)',
              textAlign: 'center',
              marginTop: 32,
              lineHeight: 1.6,
            }}
          >
            By continuing, you agree to Buildkart's{' '}
            <a
              href="#"
              style={{
                color: 'rgba(240,237,230,0.4)',
                textDecoration: 'underline',
              }}
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              style={{
                color: 'rgba(240,237,230,0.4)',
                textDecoration: 'underline',
              }}
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: rgba(240,237,230,0.2); }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #1A1A1A inset;
          -webkit-text-fill-color: #F0EDE6;
        }
      `}</style>
    </div>
  );
}
