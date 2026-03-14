import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const HomeNavbar = () => {
  const { cartItems } = useCart();
  const { isDark, toggleTheme, colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/products' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: colors.navBg,
      borderBottom: `1px solid ${colors.navBorder}`,
      fontFamily: "'Josefin Sans', sans-serif",
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{
        maxWidth: '1400px', margin: '0 auto', padding: '0 40px',
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px', fontWeight: 300, letterSpacing: '8px',
          color: colors.ink, textDecoration: 'none',
          borderBottom: `1px solid ${colors.ink}`, paddingBottom: '2px', flexShrink: 0,
          transition: 'color 0.3s',
        }}>
          AZAMS
        </Link>

        {/* Center Links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '40px',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
              textDecoration: 'none',
              color: isActive(link.path) ? '#C9A96E' : colors.ink,
              borderBottom: isActive(link.path) ? '1px solid #C9A96E' : '1px solid transparent',
              paddingBottom: '2px', transition: 'color 0.3s',
            }}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
            style={{
              width: '40px', height: '22px', borderRadius: '11px',
              backgroundColor: isDark ? '#C9A96E' : '#E2DDD5',
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background 0.3s', flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: '3px',
              left: isDark ? '21px' : '3px',
              width: '16px', height: '16px', borderRadius: '50%',
              backgroundColor: isDark ? '#1A1A18' : 'white',
              transition: 'left 0.3s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px',
            }}>
              {isDark ? '🌙' : '☀️'}
            </span>
          </button>

          {user ? (
            <>
              <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.muted }}>
                {user.displayName?.split(' ')[0] || 'Account'}
              </span>
              <button onClick={handleLogout} style={{
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: colors.ink, background: 'none', border: `1px solid ${colors.border}`,
                padding: '6px 14px', cursor: 'pointer',
                fontFamily: "'Josefin Sans', sans-serif", transition: 'all 0.3s',
              }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
              textDecoration: 'none', color: colors.ink,
              borderBottom: isActive('/login') ? '1px solid #C9A96E' : '1px solid transparent',
              paddingBottom: '2px', transition: 'color 0.3s',
            }}>
              Login
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            textDecoration: 'none', color: colors.ink, transition: 'color 0.3s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Bag
            {cartCount > 0 && (
              <span style={{
                backgroundColor: '#C9A96E', color: '#1A1A18', borderRadius: '50%',
                width: '18px', height: '18px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '9px', fontWeight: 600,
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;