import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const customerCare = [
    { label: 'Track Order', path: '/track-order' },
    { label: 'Shipping Policy', path: '/shipping-policy' },
    { label: 'Return & Exchange', path: '/return-exchange' },
    { label: 'FAQs', path: '#' },
  ];

  const information = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '#' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
  ];

  const linkStyle = {
    fontSize: '10px', letterSpacing: '1px',
    color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
  };

  return (
    <footer style={{ backgroundColor: '#1A1A18', color: 'white', fontFamily: "'Josefin Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '64px 40px 48px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '48px' }}>

        {/* Brand */}
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', letterSpacing: '8px', color: 'white', marginBottom: '16px', fontWeight: 300 }}>AZAMS</h3>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', lineHeight: 2, marginBottom: '24px', maxWidth: '240px' }}>
            Premium clothing brand. Modern elegance, timeless design. Made in Pakistan 🇵🇰
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Instagram', 'Facebook', 'WhatsApp'].map((s) => (
              <a key={s} href="#" style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2px' }}>{s}</a>
            ))}
          </div>
        </div>

        {/* Customer Care */}
        <div>
          <h4 style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>Customer Care</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {customerCare.map((item) => (
              <li key={item.label}>
                <Link to={item.path} style={linkStyle}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>Information</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {information.map((item) => (
              <li key={item.label}>
                <Link to={item.path} style={linkStyle}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>Newsletter</h4>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', lineHeight: 2, marginBottom: '16px' }}>
            Subscribe for latest arrivals and exclusive offers.
          </p>
          {subscribed ? (
            <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E' }}>✦ Subscribed!</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '11px 14px', fontSize: '10px', letterSpacing: '1px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', fontFamily: "'Josefin Sans', sans-serif", width: '100%', boxSizing: 'border-box' }}
              />
              <button type="submit" style={{ padding: '11px', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: '#C9A96E', color: '#1A1A18', border: 'none', cursor: 'pointer', fontFamily: "'Josefin Sans', sans-serif" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 40px', maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)' }}>© 2026 AZAMS. All rights reserved.</p>
        <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)' }}>Made with ♥ in Pakistan</p>
      </div>
    </footer>
  );
};

export default Footer;