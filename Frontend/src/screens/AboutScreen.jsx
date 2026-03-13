import React from 'react';
import { Link } from 'react-router-dom';

const AboutScreen = () => {
  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#1A1A18', padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div style={{ animation: 'fadeUp 0.8s ease forwards' }}>
          <p style={{ fontSize: '9px', letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', display: 'inline-block' }}></span>
            Our Story
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', fontWeight: 300, color: 'white', lineHeight: 1.05, margin: '0 0 24px' }}>
            About <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>AZAMS</em>
          </h1>
          <p style={{ fontSize: '11px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 2.2, maxWidth: '400px' }}>
            AZAMS was established in 2024 — with the vision that in Pakistani fashion, luxury and affordability can go hand in hand. We believe in premium fabric and timeless design.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '320px' }}>
          <div style={{ position: 'absolute', width: '220px', height: '320px', border: '1px solid rgba(201,169,110,0.2)', transform: 'rotate(-4deg)' }}></div>
          <div style={{ position: 'absolute', width: '220px', height: '320px', border: '1px solid rgba(201,169,110,0.1)', transform: 'rotate(4deg)' }}></div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '80px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,169,110,0.15)', position: 'relative', zIndex: 1 }}>A</p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>What We Stand For</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
            Our <em style={{ fontStyle: 'italic' }}>Values</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {[
            { icon: '◈', title: 'Quality First', desc: 'Every garment is made from premium fabric. We do not compromise on quality.' },
            { icon: '◉', title: 'Timeless Design', desc: 'Trends come and go — but AZAMS pieces will always remain relevant. Timeless over trendy.' },
            { icon: '✦', title: 'Made in Pakistan', desc: 'We are proudly a Pakistani brand. We work with local craftsmen.' },
          ].map((v) => (
            <div key={v.title} style={{ backgroundColor: 'white', padding: '48px 36px', textAlign: 'center' }}>
              <p style={{ fontSize: '24px', color: '#C9A96E', marginBottom: '20px' }}>{v.icon}</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 300, color: '#1A1A18', marginBottom: '14px' }}>{v.title}</h3>
              <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ backgroundColor: '#1A1A18', padding: '60px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { number: '2024', label: 'Est.' },
            { number: '500+', label: 'Happy Customers' },
            { number: '50+', label: 'Products' },
            { number: '🇵🇰', label: 'Made in Pakistan' },
          ].map((stat) => (
            <div key={stat.label} style={{ padding: '40px 36px', borderRight: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#C9A96E', marginBottom: '8px' }}>{stat.number}</p>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: '80px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>The People</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
            Behind <em style={{ fontStyle: 'italic' }}>AZAMS</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            { name: 'Essa Sahibzada', role: 'Founder & CEO' },
            { name: 'Design Team', role: 'Creative Direction' },
            { name: 'Our Craftsmen', role: 'Production & Quality' },
          ].map((person) => (
            <div key={person.name} style={{ backgroundColor: '#F0EDE6', padding: '36px 24px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#E2DDD5', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#C9A96E' }}>{person.name[0]}</span>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, color: '#1A1A18', marginBottom: '6px' }}>{person.name}</h3>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: '#1A1A18', padding: '80px', textAlign: 'center' }}>
        <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>Ready to Shop?</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, color: 'white', margin: '0 0 32px' }}>
          Explore Our <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Collection</em>
        </h2>
        <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#1A1A18', padding: '16px 48px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none' }}>
          Shop Now
        </Link>
      </section>

    </div>
  );
};

export default AboutScreen;