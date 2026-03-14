import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../api';

const Sidebar = () => {
  const navLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
    { label: 'Orders', path: '/admin/orderlist', icon: '◈' },
    { label: 'Products', path: '/admin/productlist', icon: '◉' },
    { label: 'Add Product', path: '/admin/product/create', icon: '+' },
  ];
  return (
    <aside style={{ width: '220px', flexShrink: 0, backgroundColor: '#1A1A18', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
      <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', letterSpacing: '6px', color: 'white', margin: 0 }}>AZAMS</h1>
        <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A96E', marginTop: '4px' }}>Admin Panel</p>
      </div>
      <nav style={{ padding: '24px 0', flex: 1 }}>
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 24px', textDecoration: 'none',
            fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
            color: window.location.pathname === link.path ? '#C9A96E' : 'rgba(255,255,255,0.4)',
            backgroundColor: window.location.pathname === link.path ? 'rgba(201,169,110,0.08)' : 'transparent',
            borderLeft: window.location.pathname === link.path ? '2px solid #C9A96E' : '2px solid transparent',
          }}>
            <span style={{ fontSize: '14px' }}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>← Back to Site</Link>
      </div>
    </aside>
  );
};

const ProductCreateScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: '11px',
    letterSpacing: '1px', backgroundColor: 'white',
    border: '1px solid #E2DDD5', outline: 'none',
    color: '#1A1A18', fontFamily: "'Josefin Sans', sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block', fontSize: '8px', letterSpacing: '3px',
    textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px',
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !image) return setError('Sab fields zaruri hain.');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/products', {
        name, price: Number(price),
        countInStock: Number(countInStock),
        category, image, description,
      });
      navigate('/admin/productlist');
    } catch (err) {
      setError('Product create nahi ho saka.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#F7F4EF' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        input::placeholder, textarea::placeholder { color: #C4BFB8; }
        input:focus, textarea:focus, select:focus { border-color: #C9A96E !important; outline: none; }
        optgroup { font-weight: bold; color: #1A1A18; }
      `}</style>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Admin</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
              Add New <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Product</em>
            </h1>
          </div>
          <Link to="/admin/productlist" style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478', textDecoration: 'none', borderBottom: '1px solid #E2DDD5', paddingBottom: '2px' }}>
            ← Back to List
          </Link>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fff0f0', border: '1px solid #fcc', padding: '12px 16px', marginBottom: '24px', fontSize: '11px', color: '#c00', letterSpacing: '1px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

            {/* LEFT: Form */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Product Name *</label>
                <input type="text" placeholder="e.g. Embroidered Shalwar Kameez" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>

              {/* Price + Stock */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Price (PKR) *</label>
                  <input type="number" placeholder="4990" value={price} onChange={(e) => setPrice(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Stock Quantity *</label>
                  <input type="number" placeholder="50" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} style={inputStyle} />
                </div>
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>Category *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="">Category chunein</option>
                  <optgroup label="─── MEN ───">
                    <option value="Shalwar Kameez">Shalwar Kameez</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Trouser">Trouser</option>
                    <option value="Jeans">Jeans</option>
                    <option value="T-Shirt">T-Shirt</option>
                  </optgroup>
                  <optgroup label="─── WOMEN ───">
                    <option value="Lawn Suit">Lawn Suit</option>
                    <option value="Kurti">Kurti</option>
                    <option value="Dupatta">Dupatta</option>
                    <option value="Abaya">Abaya</option>
                    <option value="Palazzo">Palazzo</option>
                  </optgroup>
                  <optgroup label="─── OTHER ───">
                    <option value="Unisex">Unisex</option>
                    <option value="Accessories">Accessories</option>
                  </optgroup>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label style={labelStyle}>Image URL *</label>
                <input type="text" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} style={inputStyle} />
              </div>

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea rows={4} placeholder="Product ki detail likhein..." value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }} />
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{
                padding: '14px', fontSize: '9px', letterSpacing: '3px',
                textTransform: 'uppercase', backgroundColor: loading ? '#8C8478' : '#1A1A18',
                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Josefin Sans', sans-serif", width: '100%',
              }}>
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>

            {/* RIGHT: Preview */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <p style={labelStyle}>Image Preview</p>
              <div style={{ width: '100%', paddingTop: '133%', position: 'relative', backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
                {image ? (
                  <img src={image} alt="Preview" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '24px', color: '#C4BFB8' }}>🖼</span>
                    <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#C4BFB8' }}>Image URL daalo</p>
                  </div>
                )}
              </div>
              {(name || price) && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'white', borderTop: '2px solid #C9A96E' }}>
                  <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '4px' }}>{category || 'Category'}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, color: '#1A1A18', marginBottom: '4px' }}>{name || 'Product Name'}</p>
                  <p style={{ fontSize: '12px', color: '#C9A96E' }}>Rs. {Number(price).toLocaleString() || '0'}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductCreateScreen;