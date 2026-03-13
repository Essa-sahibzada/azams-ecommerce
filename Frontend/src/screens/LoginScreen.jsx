import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const googleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError('Google login fail ho gaya. Dobara try karein.');
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Email aur password daalen.');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Email ya password galat hai.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    fontSize: '11px',
    letterSpacing: '1px',
    backgroundColor: 'transparent',
    border: '1px solid #E2DDD5',
    outline: 'none',
    color: '#1A1A18',
    fontFamily: "'Josefin Sans', sans-serif",
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      fontFamily: "'Josefin Sans', sans-serif",
      backgroundColor: '#F7F4EF',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        input::placeholder { color: #C4BFB8; }
        input:focus { border-color: #C9A96E !important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            fontWeight: 300,
            letterSpacing: '10px',
            color: '#1A1A18',
            borderBottom: '1px solid #E2DDD5',
            paddingBottom: '12px',
            marginBottom: '10px',
          }}>AZAMS</h1>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E' }}>Welcome Back</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '38px',
            fontWeight: 300,
            color: '#1A1A18',
            marginTop: '20px',
            margin: '20px 0 0',
          }}>
            Sign <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>In</em>
          </h2>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: '#fff0f0', border: '1px solid #fcc', padding: '10px 14px', marginBottom: '20px', fontSize: '11px', color: '#c00', letterSpacing: '1px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={googleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            backgroundColor: 'white',
            border: '1px solid #E2DDD5',
            cursor: 'pointer',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#1A1A18',
            fontFamily: "'Josefin Sans', sans-serif",
            marginBottom: '24px',
          }}
        >
          {/* Small Google SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2DDD5' }}></div>
          <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>Ya</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#E2DDD5' }}></div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={submitHandler}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px' }}>Email</label>
              <input
                type="email"
                placeholder="aapka@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px' }}>Password</label>
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
              width: '100%',
              padding: '14px',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backgroundColor: loading ? '#8C8478' : '#1A1A18',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Josefin Sans', sans-serif",
              marginBottom: '20px',
            }}
          >
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <p style={{ textAlign: 'center', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478' }}>
          Account nahi hai?{' '}
          <Link to="/register" style={{ color: '#C9A96E', textDecoration: 'none', borderBottom: '1px solid #C9A96E', paddingBottom: '1px' }}>
            Register Karein
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginScreen;