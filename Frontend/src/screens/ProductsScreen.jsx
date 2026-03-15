import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [filter, setFilter] = useState('All');
  const [activeGender, setActiveGender] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/products`);
        setProducts(data);
      } catch (err) {
        setError('Products could not be loaded.');
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

  const styles = {
    page: {
      fontFamily: "'Josefin Sans', sans-serif",
      backgroundColor: '#F7F4EF',
      minHeight: '100vh',
      width: '100%',
    },
    inner: {
      width: '100%',
      maxWidth: '100%',
      padding: '48px 32px',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    tag: {
      fontSize: '9px',
      letterSpacing: '5px',
      textTransform: 'uppercase',
      color: '#C9A96E',
      marginBottom: '10px',
      display: 'block',
    },
    title: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '42px',
      fontWeight: 300,
      color: '#1A1A18',
      margin: 0,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: '4px',
      width: '100%',
    },
    card: {
      backgroundColor: '#F0EDE6',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    imgWrap: {
      width: '100%',
      paddingTop: '133%', // 3:4 ratio
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#E8E2D8',
      display: 'block',
      textDecoration: 'none',
    },
    img: {
      position: 'absolute',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    info: {
      padding: '10px 8px 16px',
    },
    cat: {
      fontSize: '8px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: '#8C8478',
      marginBottom: '3px',
      display: 'block',
    },
    name: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '15px',
      fontWeight: 300,
      color: '#1A1A18',
      marginBottom: '3px',
      display: 'block',
      textDecoration: 'none',
    },
    price: {
      fontSize: '11px',
      letterSpacing: '1px',
      color: '#C9A96E',
      marginBottom: '10px',
      display: 'block',
    },
  };

  const menSubs = ['Shalwar Kameez', 'Shirt', 'Trouser', 'Jeans', 'T-Shirt'];
  const womenSubs = ['Lawn Suit', 'Kurti', 'Dupatta', 'Abaya', 'Palazzo'];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter || p.category?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        @media (max-width: 1024px) { .az-grid { grid-template-columns: repeat(3, minmax(0,1fr)) !important; } }
        @media (max-width: 640px)  { .az-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; } }
      `}</style>

      <div style={styles.inner}>

        {/* Header */}
        <div style={styles.header}>
          <span style={styles.tag}>AZAMS</span>
          <h1 style={styles.title}>
            Our <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Collection</em>
          </h1>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '40px' }}>
          {/* Main Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            {['All', 'Men', 'Women'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === 'All') { setFilter('All'); setActiveGender(null); }
                  else { setActiveGender(activeGender === cat ? null : cat); setFilter(cat); }
                }}
                style={{
                  padding: '10px 32px', fontSize: '9px', letterSpacing: '3px',
                  textTransform: 'uppercase', border: '1px solid', cursor: 'pointer',
                  borderColor: (filter === cat || activeGender === cat) ? '#1A1A18' : '#E2DDD5',
                  backgroundColor: (filter === cat || activeGender === cat) ? '#1A1A18' : 'transparent',
                  color: (filter === cat || activeGender === cat) ? 'white' : '#8C8478',
                  fontFamily: "'Josefin Sans', sans-serif", transition: 'all 0.2s',
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Men Subcategories */}
          {activeGender === 'Men' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['Shalwar Kameez', 'Shirt', 'Trouser', 'Jeans', 'T-Shirt'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setFilter(sub)}
                  style={{
                    padding: '7px 16px', fontSize: '8px', letterSpacing: '2px',
                    textTransform: 'uppercase', border: '1px solid', cursor: 'pointer',
                    borderColor: filter === sub ? '#C9A96E' : '#E2DDD5',
                    backgroundColor: filter === sub ? '#C9A96E' : 'transparent',
                    color: filter === sub ? '#1A1A18' : '#8C8478',
                    fontFamily: "'Josefin Sans', sans-serif", transition: 'all 0.2s',
                  }}
                >{sub}</button>
              ))}
            </div>
          )}

          {/* Women Subcategories */}
          {activeGender === 'Women' && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['Lawn Suit', 'Kurti', 'Dupatta', 'Abaya', 'Palazzo'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setFilter(sub)}
                  style={{
                    padding: '7px 16px', fontSize: '8px', letterSpacing: '2px',
                    textTransform: 'uppercase', border: '1px solid', cursor: 'pointer',
                    borderColor: filter === sub ? '#C9A96E' : '#E2DDD5',
                    backgroundColor: filter === sub ? '#C9A96E' : 'transparent',
                    color: filter === sub ? '#1A1A18' : '#8C8478',
                    fontFamily: "'Josefin Sans', sans-serif", transition: 'all 0.2s',
                  }}
                >{sub}</button>
              ))}
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="az-grid" style={styles.grid}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ backgroundColor: '#E8E2D8', paddingTop: '133%' }} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{ textAlign: 'center', color: '#8C8478', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', padding: '60px 0' }}>
            {error}
          </p>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="az-grid" style={styles.grid}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={styles.card}>

                {/* Image */}
                <Link to={`/product/${product._id}`} style={styles.imgWrap}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.img}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {product.countInStock === 0 && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)', padding: '6px 14px' }}>Sold Out</span>
                    </div>
                  )}
                </Link>

                {/* Info */}
                <div style={styles.info}>
                  <span style={styles.cat}>{product.category || 'Clothing'}</span>
                  <Link to={`/product/${product._id}`} style={styles.name}>{product.name}</Link>
                  <span style={styles.price}>Rs. {product.price?.toLocaleString()}</span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.countInStock === 0}
                    style={{
                      width: '100%',
                      padding: '9px',
                      fontSize: '8px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer',
                      backgroundColor: addedId === product._id ? '#C9A96E' : product.countInStock === 0 ? '#E2DDD5' : '#1A1A18',
                      color: addedId === product._id ? '#1A1A18' : product.countInStock === 0 ? '#8C8478' : '#fff',
                      transition: 'background 0.3s',
                    }}
                  >
                    {addedId === product._id ? '✦ Added' : product.countInStock === 0 ? 'Sold Out' : 'Add to Bag'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredProducts.length === 0 && (
          <p style={{ textAlign: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,169,110,0.3)', padding: '80px 0' }}>
            Coming Soon
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;