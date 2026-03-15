import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicyScreen = () => {
  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      {/* Hero */}
      <div style={{ backgroundColor: '#1A1A18', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>AZAMS</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '52px', fontWeight: 300, color: 'white', margin: 0 }}>
          Shipping <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Policy</em>
        </h1>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>

        {/* Delivery Times */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>01</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Delivery <em style={{ fontStyle: 'italic' }}>Times</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', marginBottom: '20px' }}>
            {[
              { city: 'Karachi, Lahore, Islamabad', days: '2-3 Business Days' },
              { city: 'Other Major Cities', days: '3-5 Business Days' },
              { city: 'Remote Areas', days: '5-7 Business Days' },
            ].map((item) => (
              <div key={item.city} style={{ backgroundColor: 'white', padding: '24px 20px' }}>
                <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '8px' }}>{item.city}</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 300, color: '#1A1A18' }}>{item.days}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2 }}>
            Orders typically processed within 24 hours of placement. Delivery times may vary during peak seasons or public holidays.
          </p>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* Shipping Charges */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>02</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Shipping <em style={{ fontStyle: 'italic' }}>Charges</em>
          </h2>
          <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '14px 20px', backgroundColor: '#1A1A18' }}>
              <span style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Order Amount</span>
              <span style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Shipping Fee</span>
            </div>
            {[
              { range: 'Under Rs. 5,000', fee: 'Rs. 250' },
              { range: 'Rs. 5,000 and above', fee: 'FREE ✦', highlight: true },
            ].map((row, i) => (
              <div key={row.range} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '16px 20px', borderBottom: '1px solid #F0EDE6', backgroundColor: i % 2 === 0 ? 'white' : '#FDFCFA' }}>
                <span style={{ fontSize: '11px', color: '#1A1A18', letterSpacing: '0.5px' }}>{row.range}</span>
                <span style={{ fontSize: '11px', color: row.highlight ? '#C9A96E' : '#1A1A18', letterSpacing: '0.5px', fontWeight: row.highlight ? 500 : 400 }}>{row.fee}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* Order Tracking */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>03</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Order <em style={{ fontStyle: 'italic' }}>Tracking</em>
          </h2>
          <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2.5, marginBottom: '20px' }}>
            You can track your order on the <Link to="/track-order" style={{ color: '#C9A96E', textDecoration: 'none', borderBottom: '1px solid #C9A96E' }}>Track Order</Link> page. After placing your order, a confirmation message will be sent to you.
          </p>
          <div style={{ backgroundColor: '#1A1A18', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '6px' }}>Track Your Order</p>
              <p style={{ fontSize: '11px', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Check real-time status with your Order ID</p>
            </div>
            <Link to="/track-order" style={{ padding: '12px 28px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: '#C9A96E', color: '#1A1A18', textDecoration: 'none' }}>
              Track Now
            </Link>
          </div>
        </section>

        <div style={{ height: '1px', backgroundColor: '#E2DDD5', marginBottom: '56px' }}></div>

        {/* Important Notes */}
        <section style={{ marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>04</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, color: '#1A1A18', marginBottom: '20px' }}>
            Important <em style={{ fontStyle: 'italic' }}>Notes</em>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Please provide correct address and phone number for delivery.',
              'If the first delivery attempt fails, our rider will contact you again.',
              'Please keep the exact amount ready for Cash on Delivery.',
              'Orders are not processed on weekends and public holidays.',
              'For any issues, please contact us at support@azams.com.',
            ].map((note, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <span style={{ color: '#C9A96E', flexShrink: 0, marginTop: '2px' }}>✦</span>
                <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2, margin: 0 }}>{note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <div style={{ backgroundColor: '#F0EDE6', padding: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Any Questions?</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 300, color: '#1A1A18', marginBottom: '16px' }}>We Are Here</p>
          <a href="mailto:support@azams.com" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A18', textDecoration: 'none', borderBottom: '1px solid #1A1A18', paddingBottom: '2px' }}>
            support@azams.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default ShippingPolicyScreen;