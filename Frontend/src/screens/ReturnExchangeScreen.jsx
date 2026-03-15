import React from 'react';
import { Link } from 'react-router-dom';

const ReturnExchangeScreen = () => {
  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      {/* Hero */}
      <div style={{ backgroundColor: '#1A1A18', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>AZAMS</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'white', margin: 0 }}>
          Return & <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Exchange</em>
        </h1>
        <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginTop: '16px', lineHeight: 2 }}>
          We want you to love every piece. If something isn't right, we're here to help.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>

        {/* Return Policy */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>01</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Return <em style={{ fontStyle: 'italic' }}>Policy</em>
          </h2>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2.5, marginBottom: '24px' }}>
            We accept returns within <strong style={{ color: '#1A1A18' }}>7 days</strong> of delivery. Items must be unused, unwashed, and in their original packaging with all tags attached.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { icon: '✦', title: 'Eligible', desc: 'Unused items in original packaging with tags' },
              { icon: '◈', title: 'Time Frame', desc: 'Within 7 days of delivery' },
              { icon: '◉', title: 'Condition', desc: 'Unwashed, unaltered, no damage' },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: 'white', padding: '24px 20px' }}>
                <span style={{ fontSize: '18px', color: '#C9A96E', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A18', marginBottom: '8px' }}>{item.title}</p>
                <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* Exchange Policy */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>02</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Exchange <em style={{ fontStyle: 'italic' }}>Policy</em>
          </h2>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2.5, marginBottom: '24px' }}>
            Exchanges are accepted within <strong style={{ color: '#1A1A18' }}>7 days</strong> of delivery for size or color changes, subject to stock availability. Exchange shipping charges may apply.
          </p>
          <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', backgroundColor: '#1A1A18' }}>
              <span style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Exchange Reasons Accepted</span>
            </div>
            {[
              { reason: 'Wrong size received', accepted: true },
              { reason: 'Wrong item received', accepted: true },
              { reason: 'Size exchange (subject to availability)', accepted: true },
              { reason: 'Color exchange (subject to availability)', accepted: true },
              { reason: 'Change of mind', accepted: false },
              { reason: 'Item already worn or washed', accepted: false },
            ].map((row, i) => (
              <div key={row.reason} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #F0EDE6', backgroundColor: i % 2 === 0 ? 'white' : '#FDFCFA' }}>
                <span style={{ fontSize: '10px', color: '#1A1A18', letterSpacing: '0.5px' }}>{row.reason}</span>
                <span style={{ fontSize: '10px', color: row.accepted ? '#C9A96E' : '#ef4444', letterSpacing: '1px' }}>
                  {row.accepted ? '✓ Accepted' : '✗ Not Accepted'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* How to Return */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>03</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            How to <em style={{ fontStyle: 'italic' }}>Return</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { step: '01', title: 'Contact Us', desc: 'Email us at support@azams.com with your Order ID and reason for return.' },
              { step: '02', title: 'Get Approval', desc: 'Our team will review and send you a return confirmation within 24 hours.' },
              { step: '03', title: 'Pack the Item', desc: 'Pack the item securely in its original packaging with all tags attached.' },
              { step: '04', title: 'Ship It Back', desc: 'Send the item to our address provided in the return confirmation email.' },
              { step: '05', title: 'Refund / Exchange', desc: 'Refund or exchange will be processed within 5-7 business days of receiving the item.' },
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: '20px', backgroundColor: 'white', padding: '20px 24px', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#E2DDD5', flexShrink: 0, lineHeight: 1 }}>{item.step}</span>
                <div>
                  <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A18', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* Non-Returnable */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>04</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Non-Returnable <em style={{ fontStyle: 'italic' }}>Items</em>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Sale or discounted items',
              'Items that have been worn, washed, or altered',
              'Items without original tags or packaging',
              'Innerwear and accessories for hygiene reasons',
              'Custom or personalized orders',
            ].map((note, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }}>✗</span>
                <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2, margin: 0 }}>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div style={{ backgroundColor: '#1A1A18', padding: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Need Help?</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: 'white', marginBottom: '20px' }}>
            Our team is ready to assist you
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:support@azams.com" style={{ padding: '12px 28px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: '#C9A96E', color: '#1A1A18', textDecoration: 'none' }}>
              Email Us
            </a>
            <Link to="/track-order" style={{ padding: '12px 28px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: 'transparent', color: 'white', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
              Track Order
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReturnExchangeScreen;