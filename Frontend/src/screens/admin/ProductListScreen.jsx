import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Product delete karna chahte hain?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert('Delete fail ho gaya');
    }
  };

  const stockColor = (count) => {
    if (count === 0) return '#ef4444';
    if (count <= 5) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#F7F4EF' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Admin</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
              Inventory <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Management</em>
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>{products.length} Products</p>
            <Link to="/admin/product/create" style={{
              padding: '11px 24px', fontSize: '9px', letterSpacing: '2px',
              textTransform: 'uppercase', textDecoration: 'none',
              backgroundColor: '#1A1A18', color: 'white',
            }}>
              + Add Product
            </Link>
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
          {/* Header Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '56px 2fr 1fr 0.8fr 0.6fr 1fr',
            padding: '14px 20px',
            backgroundColor: '#1A1A18',
            gap: '12px',
            alignItems: 'center',
          }}>
            {['', 'Product', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
              <span key={h} style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Loading...
            </div>
          ) : products.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Koi product nahi
            </div>
          ) : (
            products.map((product, i) => (
              <div key={product._id} style={{
                display: 'grid',
                gridTemplateColumns: '56px 2fr 1fr 0.8fr 0.6fr 1fr',
                padding: '14px 20px',
                borderBottom: '1px solid #F0EDE6',
                backgroundColor: i % 2 === 0 ? 'white' : '#FDFCFA',
                alignItems: 'center',
                gap: '12px',
              }}>
                {/* Thumbnail */}
                <div style={{ width: '44px', height: '56px', backgroundColor: '#E8E2D8', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                {/* Name */}
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 300, color: '#1A1A18', marginBottom: '2px' }}>{product.name}</p>
                  <p style={{ fontSize: '8px', letterSpacing: '1px', color: '#8C8478', fontFamily: 'monospace' }}>#{product._id?.slice(-6).toUpperCase()}</p>
                </div>

                {/* Category */}
                <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478' }}>
                  {product.category || '—'}
                </span>

                {/* Price */}
                <span style={{ fontSize: '11px', color: '#C9A96E', letterSpacing: '0.5px' }}>
                  Rs. {product.price?.toLocaleString()}
                </span>

                {/* Stock */}
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: stockColor(product.countInStock),
                }}>
                  {product.countInStock}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                    style={{
                      padding: '7px 14px', fontSize: '7px', letterSpacing: '2px',
                      textTransform: 'uppercase', backgroundColor: 'transparent',
                      color: '#1A1A18', border: '1px solid #E2DDD5', cursor: 'pointer',
                      fontFamily: "'Josefin Sans', sans-serif",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      padding: '7px 14px', fontSize: '7px', letterSpacing: '2px',
                      textTransform: 'uppercase', backgroundColor: 'transparent',
                      color: '#ef4444', border: '1px solid #fecaca', cursor: 'pointer',
                      fontFamily: "'Josefin Sans', sans-serif",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductListScreen;