import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../firebase';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const googleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError('Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    if (!firstName || !email || !password) return setError('Sab fields bharein.');
    if (password.length < 6) return setError('Password must be at least 6 characters long.');
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      navigate('/');
    } catch (err) {
      setError('Account could not be created. The email may already be registered.');
    } finally {
      setLoading(false);
    }
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

      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px', fontWeight: 300, letterSpacing: '10px',
            color: '#1A1A18', borderBottom: '1px solid #E2DDD5',
            paddingBottom: '12px', marginBottom: '10px',
          }}>AZAMS</h1>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>Join Us</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
            Create <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Account</em>
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
          onClick={googleSignup}
          disabled={loading}
          style={{
            width: '100%', padding: '13px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            backgroundColor: 'white', border: '1px solid #E2DDD5',
            cursor: 'pointer', fontSize: '10px', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#1A1A18',
            fontFamily: "'Josefin Sans', sans-serif", marginBottom: '24px',
          }}
        >
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

        <form onSubmit={submitHandler}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>

            {/* First + Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input type="text" placeholder="Ali" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" placeholder="Ahmed" value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="aapka@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              <p style={{ fontSize: '8px', letterSpacing: '1px', color: '#8C8478', marginTop: '6px' }}>At least 6 characters.</p>
            </div>
          </div>

          {/* Submit */}
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
              marginBottom: '20px',
            }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p style={{ textAlign: 'center', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#C9A96E', textDecoration: 'none', borderBottom: '1px solid #C9A96E', paddingBottom: '1px' }}>
            Please Login.
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterScreen;