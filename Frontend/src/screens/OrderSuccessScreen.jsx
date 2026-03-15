import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

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
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes drawCircle { from { stroke-dashoffset: 314; } to { stroke-dashoffset: 0; } }
        @keyframes drawCheck { from { stroke-dashoffset: 80; } to { stroke-dashoffset: 0; } }
      `}</style>

      <div style={{
        textAlign: 'center',
        maxWidth: '480px',
        width: '100%',
        opacity: visible ? 1 : 0,
        animation: visible ? 'fadeUp 0.8s ease forwards' : 'none',
      }}>

        {/* Animated Check Icon */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50" cy="50" r="46"
              stroke="#C9A96E"
              strokeWidth="1"
              strokeDasharray="314"
              strokeDashoffset="314"
              style={{ animation: 'drawCircle 1.2s ease forwards 0.3s' }}
            />
            <polyline
              points="30,52 44,66 70,36"
              stroke="#C9A96E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80"
              strokeDashoffset="80"
              style={{ animation: 'drawCheck 0.6s ease forwards 1.2s' }}
            />
          </svg>
        </div>

        {/* Text */}
        <p style={{ fontSize: '9px', letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>
         Thank you.!
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '52px',
          fontWeight: 300,
          color: '#1A1A18',
          marginBottom: '20px',
          lineHeight: 1.1,
        }}>
          Order <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Confirmed</em>
        </h1>
        <p style={{
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#8C8478',
          lineHeight: 2,
          marginBottom: '48px',
          maxWidth: '320px',
          margin: '0 auto 48px',
        }}>
          Your order has been received. We will contact you shortly.
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', justifyContent: 'center' }}>
          <div style={{ width: '60px', height: '1px', backgroundColor: '#E2DDD5' }}></div>
          <span style={{ color: '#C9A96E', fontSize: '12px' }}>✦</span>
          <div style={{ width: '60px', height: '1px', backgroundColor: '#E2DDD5' }}></div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backgroundColor: '#1A1A18',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Home Page
          </Link>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              fontSize: '9px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              backgroundColor: 'transparent',
              color: '#1A1A18',
              textDecoration: 'none',
              border: '1px solid #E2DDD5',
            }}
          >
            More Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessScreen;