import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin credentials — change these as needed
  const ADMIN_EMAIL = 'admin@azams.com';
  const ADMIN_PASSWORD = 'azams@admin2026';

  const submitHandler = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('azamsAdmin', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Email ya password galat hai.');
      }
      setLoading(false);
    }, 800);
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px', fontSize: '11px',
    letterSpacing: '1px', backgroundColor: 'transparent',
    border: '1px solid #E2DDD5', outline: 'none',
    color: '#1A1A18', fontFamily: "'Josefin Sans', sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '8px', letterSpacing: '3px',
    textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px',
  };

  return (
    <div style={{
      fontFamily: "'Josefin Sans', sans-serif",
      backgroundColor: '#1A1A18',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        input::placeholder { color: #6b6560; }
        input:focus { border-color: #C9A96E !important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          {/* Gold decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A96E' }}></div>
            <span style={{ color: '#C9A96E', fontSize: '10px' }}>✦</span>
            <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A96E' }}></div>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '32px', fontWeight: 300, letterSpacing: '10px',
            color: 'white', marginBottom: '8px',
          }}>AZAMS</h1>
          <p style={{ fontSize: '8px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E' }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: '#F7F4EF', padding: '40px 36px' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', fontWeight: 300, color: '#1A1A18',
            marginBottom: '28px', textAlign: 'center',
          }}>
            Sign <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>In</em>
          </h2>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: '#fff0f0', border: '1px solid #fcc',
              padding: '10px 14px', marginBottom: '20px',
              fontSize: '11px', color: '#c00', letterSpacing: '1px', textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={labelStyle}>Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@azams.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
                backgroundColor: loading ? '#8C8478' : '#1A1A18',
                color: 'white', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Josefin Sans', sans-serif",
              }}
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: '24px' }}>
          Restricted Access — Authorized Personnel Only
        </p>

      </div>
    </div>
  );
};

export default AdminLoginScreen;