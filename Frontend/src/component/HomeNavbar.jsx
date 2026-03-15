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
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/products' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
    textDecoration: 'none',
    color: isActive(path) ? '#C9A96E' : colors.ink,
    borderBottom: isActive(path) ? '1px solid #C9A96E' : '1px solid transparent',
    paddingBottom: '2px', whiteSpace: 'nowrap',
  });

  return (
    <nav style={{
      backgroundColor: colors.navBg,
      borderBottom: `1px solid ${colors.navBorder}`,
      fontFamily: "'Josefin Sans', sans-serif",
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'background 0.3s',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Josefin+Sans:wght@300;400&display=swap');
        .hamburger { display: none !important; }
        .mobile-menu { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      {/* ── DESKTOP ── */}
      <div className="desktop-nav" style={{
        maxWidth: '1400px', margin: '0 auto', padding: '0 40px',
        height: '64px', display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: '20px',
      }}>
        {/* LEFT: Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px', fontWeight: 300, letterSpacing: '8px',
          color: colors.ink, textDecoration: 'none',
          borderBottom: `1px solid ${colors.ink}`, paddingBottom: '2px',
          justifySelf: 'start',
        }}>AZAMS</Link>

        {/* CENTER: Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={linkStyle(link.path)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifySelf: 'end' }}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{
            width: '40px', height: '22px', borderRadius: '11px',
            backgroundColor: isDark ? '#C9A96E' : '#E2DDD5',
            border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0,
          }}>
            <span style={{
              position: 'absolute', top: '3px', left: isDark ? '21px' : '3px',
              width: '16px', height: '16px', borderRadius: '50%',
              backgroundColor: isDark ? '#1A1A18' : 'white',
              transition: 'left 0.3s', fontSize: '9px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{isDark ? '🌙' : '☀️'}</span>
          </button>

          {user ? (
            <>
              <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.muted, whiteSpace: 'nowrap' }}>
                {user.displayName?.split(' ')[0] || 'Account'}
              </span>
              <button onClick={handleLogout} style={{
                fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                color: colors.ink, background: 'none', border: `1px solid ${colors.border}`,
                padding: '6px 14px', cursor: 'pointer', fontFamily: "'Josefin Sans', sans-serif",
                whiteSpace: 'nowrap',
              }}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={linkStyle('/login')}>Login</Link>
          )}

          {/* Cart */}
          <Link to="/cart" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
            textDecoration: 'none', color: colors.ink, whiteSpace: 'nowrap',
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
              }}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="hamburger" style={{
        padding: '0 20px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '16px', letterSpacing: '6px',
          color: colors.ink, textDecoration: 'none',
          borderBottom: `1px solid ${colors.ink}`, paddingBottom: '2px',
        }}>AZAMS</Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Cart */}
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: colors.ink }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span style={{
                backgroundColor: '#C9A96E', color: '#1A1A18', borderRadius: '50%',
                width: '18px', height: '18px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '9px', fontWeight: 600,
              }}>{cartCount}</span>
            )}
          </Link>

          {/* Hamburger Button */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.ink, padding: '4px' }}>
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: colors.navBg,
          borderTop: `1px solid ${colors.navBorder}`,
          padding: '8px 20px 16px',
        }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '13px 0',
                fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive(link.path) ? '#C9A96E' : colors.ink,
                borderBottom: `1px solid ${colors.navBorder}`,
              }}>{link.label}</Link>
          ))}

          <div style={{ padding: '13px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.navBorder}` }}>
            <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: colors.muted }}>
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button onClick={toggleTheme} style={{
              width: '40px', height: '22px', borderRadius: '11px',
              backgroundColor: isDark ? '#C9A96E' : '#E2DDD5',
              border: 'none', cursor: 'pointer', position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: '3px', left: isDark ? '21px' : '3px',
                width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: isDark ? '#1A1A18' : 'white', transition: 'left 0.3s',
              }}></span>
            </button>
          </div>

          {user ? (
            <button onClick={handleLogout} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '13px 0', fontSize: '10px', letterSpacing: '3px',
              textTransform: 'uppercase', color: '#ef4444',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Josefin Sans', sans-serif",
            }}>Logout ({user.displayName?.split(' ')[0]})</button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '13px 0',
              fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
              textDecoration: 'none', color: colors.ink,
            }}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;