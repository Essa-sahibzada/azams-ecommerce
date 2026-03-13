import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HomeNavbar = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((a, i) => a + i.qty, 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Login', path: '/login' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: '#F7F4EF',
      borderBottom: '1px solid #E2DDD5',
      fontFamily: "'Josefin Sans', sans-serif",
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '20px',
          fontWeight: 300,
          letterSpacing: '8px',
          color: '#1A1A18',
          textDecoration: 'none',
          borderBottom: '1px solid #1A1A18',
          paddingBottom: '2px',
          flexShrink: 0,
        }}>
          AZAMS
        </Link>

        {/* Desktop Links - CENTER */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontSize: '9px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: isActive(link.path) ? '#C9A96E' : '#1A1A18',
                borderBottom: isActive(link.path) ? '1px solid #C9A96E' : '1px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.target.style.color = '#C9A96E'; }}
              onMouseLeave={e => { if (!isActive(link.path)) e.target.style.color = '#1A1A18'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <Link to="/cart" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#1A1A18',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Bag
          {cartCount > 0 && (
            <span style={{
              backgroundColor: '#C9A96E',
              color: '#1A1A18',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: 600,
            }}>
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
};

export default HomeNavbar;