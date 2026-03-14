import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap');
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#1A1A18', color: 'white', padding: '80px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '6px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', display: 'inline-block' }}></span>
            Summer Collection 2026
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '72px', fontWeight: 300, lineHeight: 1.05, marginBottom: '24px', margin: '0 0 24px' }}>
            New <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Arrivals</em>
          </h1>
          <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', lineHeight: 2, maxWidth: '360px', margin: '0 0 40px' }}>
            Crafted for the modern wardrobe. Timeless silhouettes, premium fabric, effortless style.
          </p>
          <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#1A1A18', padding: '14px 36px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none' }}>
            Shop Now
          </Link>
        </div>
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '300px' }}>
          <div style={{ position: 'absolute', width: '200px', height: '300px', border: '1px solid rgba(201,169,110,0.3)', transform: 'rotate(6deg)' }}></div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,169,110,0.2)', position: 'relative', zIndex: 1 }}>AZAMS</p>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ backgroundColor: '#141412', padding: '12px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'ticker 25s linear infinite', width: 'max-content' }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '0 40px', flexShrink: 0 }}>
              New Arrivals <span style={{ color: '#C9A96E', margin: '0 12px' }}>✦</span> Summer 2026 <span style={{ color: '#C9A96E', margin: '0 12px' }}>✦</span> AZAMS Collection <span style={{ color: '#C9A96E', margin: '0 12px' }}>✦</span> Free Delivery over Rs.5000
            </span>
          ))}
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section style={{ padding: '80px 40px' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '10px' }}>Featured</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
              Latest <em style={{ fontStyle: 'italic' }}>Pieces</em>
            </h2>
          </div>
          <Link to="/products" style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', textDecoration: 'none', borderBottom: '1px solid #E2DDD5', paddingBottom: '3px' }}>
            View All
          </Link>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ backgroundColor: '#E8E2D8', paddingTop: '133%' }} />
            ))}
          </div>
        )}

        {/* Products 4-column grid */}
        {!loading && products.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', width: '100%' }}>
            {products.map((product) => (
              <div key={product._id} style={{ backgroundColor: '#F0EDE6', overflow: 'hidden' }}>
                {/* Image */}
                <Link to={`/product/${product._id}`} style={{ display: 'block', textDecoration: 'none', position: 'relative', width: '100%', paddingTop: '133%', overflow: 'hidden', backgroundColor: '#E8E2D8' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </Link>
                {/* Info */}
                <div style={{ padding: '10px 8px 16px' }}>
                  <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '3px' }}>{product.category || 'Clothing'}</p>
                  <Link to={`/product/${product._id}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 300, color: '#1A1A18', display: 'block', textDecoration: 'none', marginBottom: '3px' }}>{product.name}</Link>
                  <p style={{ fontSize: '11px', color: '#C9A96E', letterSpacing: '1px', marginBottom: '10px' }}>Rs. {product.price?.toLocaleString()}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      width: '100%', padding: '9px', fontSize: '8px', letterSpacing: '2px',
                      textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                      backgroundColor: addedId === product._id ? '#C9A96E' : '#1A1A18',
                      color: addedId === product._id ? '#1A1A18' : 'white',
                      transition: 'background 0.3s',
                    }}
                  >
                    {addedId === product._id ? '✦ Added' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── EDITORIAL STRIP ── */}
      <section style={{ margin: '0 40px 80px', backgroundColor: '#1A1A18', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '320px' }}>
        <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '16px' }}>Exclusive</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '20px' }}>
            The <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Denim</em> Edit
          </h2>
          <p style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 2, marginBottom: '30px', maxWidth: '280px' }}>
            Premium denim crafted for everyday luxury.
          </p>
          <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#1A1A18', padding: '12px 28px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none', width: 'fit-content' }}>
            Shop Denim
          </Link>
        </div>
        <div style={{ backgroundColor: '#141412', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '80px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,169,110,0.15)' }}>SS26</p>
        </div>
      </section>

    </div>
  );
};

export default HomeScreen;