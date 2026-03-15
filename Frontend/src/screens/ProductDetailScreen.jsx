import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, size: selectedSize });
    navigate('/cart');
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Josefin Sans', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>
      Loading...
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Josefin Sans', sans-serif", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>
      Product nahi mila
    </div>
  );

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: typeof colors !== 'undefined' ? colors.bg : '#F7F4EF', minHeight: '100vh', transition: 'background 0.3s' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* LEFT: Image */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ width: '100%', paddingTop: '125%', position: 'relative', backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {product.countInStock === 0 && (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.5)', padding: '10px 24px' }}>Sold Out</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Details */}
          <div style={{ paddingTop: '16px' }}>

            {/* Category + Code */}
            <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>
              {product.category || 'Clothing'}
            </p>

            {/* Name */}
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#1A1A18', marginBottom: '8px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Product Code */}
            <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '20px' }}>
              Product Code: AZ-{product._id?.slice(-6).toUpperCase()}
            </p>

            {/* Price */}
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, color: '#1A1A18', marginBottom: '8px' }}>
              Rs. {product.price?.toLocaleString()}
            </p>

            {/* Stock warning */}
            {product.countInStock <= 5 && product.countInStock > 0 && (
              <p style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '16px' }}>
                ⚠ Sirf {product.countInStock}Remaining
              </p>
            )}

            <div style={{ width: '40px', height: '1px', backgroundColor: '#E2DDD5', margin: '20px 0' }}></div>

            {/* Size Selector */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '12px' }}>
                Select Size — <span style={{ color: '#C9A96E' }}>{selectedSize}</span>
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '44px', height: '44px',
                      fontSize: '9px', letterSpacing: '1px',
                      cursor: 'pointer',
                      backgroundColor: selectedSize === size ? '#1A1A18' : 'transparent',
                      color: selectedSize === size ? 'white' : '#8C8478',
                      border: `1px solid ${selectedSize === size ? '#1A1A18' : '#E2DDD5'}`,
                      fontFamily: "'Josefin Sans', sans-serif",
                      transition: 'all 0.2s',
                    }}
                  >{size}</button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                style={{
                  width: '100%', padding: '15px',
                  fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
                  backgroundColor: added ? '#C9A96E' : '#1A1A18',
                  color: added ? '#1A1A18' : 'white',
                  border: 'none', cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer',
                  fontFamily: "'Josefin Sans', sans-serif",
                  transition: 'all 0.3s',
                }}
              >
                {added ? '✦ Added to Bag' : product.countInStock === 0 ? 'Sold Out' : 'Add to Bag'}
              </button>

              {product.countInStock > 0 && (
                <button
                  onClick={handleBuyNow}
                  style={{
                    width: '100%', padding: '15px',
                    fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
                    backgroundColor: 'transparent', color: '#1A1A18',
                    border: '1px solid #E2DDD5', cursor: 'pointer',
                    fontFamily: "'Josefin Sans', sans-serif",
                  }}
                >
                  Buy Now
                </button>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div style={{ marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #E2DDD5' }}>
                <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '12px' }}>Description</p>
                <p style={{ fontSize: '11px', letterSpacing: '1px', color: '#1A1A18', lineHeight: 2 }}>{product.description}</p>
              </div>
            )}

            {/* Care */}
            <div style={{ paddingTop: '20px', borderTop: '1px solid #E2DDD5' }}>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '12px' }}>Composition & Care</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['98% Cotton, 2% Elastane', 'Machine wash cold', 'Do not bleach', 'Made in Pakistan 🇵🇰'].map((item) => (
                  <li key={item} style={{ fontSize: '10px', letterSpacing: '1px', color: '#8C8478', lineHeight: 2 }}>✦ {item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;