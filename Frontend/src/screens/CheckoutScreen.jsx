import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = subtotal >= 5000 ? 0 : 250;
  const totalPrice = subtotal + shippingPrice;

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !address || !city || !phone) return setError('Sab fields bharein.');
    if (phone.length < 11) return setError('Phone number 11 digits ka hona chahiye.');
    if (cartItems.length === 0) return setError('Cart khali hai.');

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/orders`, {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: { name, address, city, phone },
        paymentMethod: 'Cash on Delivery',
        itemsPrice: subtotal,
        shippingPrice,
        totalPrice,
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError('Order place nahi hua. Dobara try karein.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    fontSize: '11px',
    letterSpacing: '1px',
    backgroundColor: 'transparent',
    border: '1px solid #E2DDD5',
    outline: 'none',
    color: '#1A1A18',
    fontFamily: "'Josefin Sans', sans-serif",
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '8px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#8C8478',
    marginBottom: '6px',
  };

  const sectionTitle = {
    fontSize: '9px',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#C9A96E',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #E2DDD5',
  };

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: typeof colors !== 'undefined' ? colors.bg : '#F7F4EF', minHeight: '100vh', transition: 'background 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');
        input::placeholder { color: #C4BFB8; font-size: 11px; }
        input:focus { border-color: #C9A96E !important; }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '10px' }}>Final Step</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
            Complete <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Order</em>
          </h1>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: '#fff0f0', border: '1px solid #fcc', padding: '12px 16px', marginBottom: '24px', fontSize: '11px', color: '#c00', letterSpacing: '1px' }}>
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>

            {/* LEFT: Form */}
            <div style={{ flex: 1 }}>

              {/* Shipping Address */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={sectionTitle}>Shipping Address</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Ali Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Street Address *</label>
                    <input
                      type="text"
                      placeholder="House #, Street, Area"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input
                        type="text"
                        placeholder="Lahore, Karachi..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone *</label>
                      <input
                        type="tel"
                        placeholder="03xxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={inputStyle}
                        maxLength={11}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={sectionTitle}>Payment Method</h2>
                <div style={{ border: '1px solid #C9A96E', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(201,169,110,0.04)' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#C9A96E' }}></div>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1A1A18', marginBottom: '2px' }}>Cash on Delivery</p>
                    <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#8C8478' }}>Delivery pe payment karein</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT: Order Summary */}
            <div style={{ width: '340px', flexShrink: 0 }}>
              <div style={{ backgroundColor: '#1A1A18', padding: '32px', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  Your Order
                </h2>

                {/* Items */}
                <div style={{ marginBottom: '24px', maxHeight: '260px', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div key={item._id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '64px', backgroundColor: '#2a2a28', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontWeight: 300, color: 'white', marginBottom: '2px' }}>{item.name}</p>
                        <p style={{ fontSize: '9px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)' }}>Qty: {item.qty}</p>
                      </div>
                      <p style={{ fontSize: '11px', color: '#C9A96E', flexShrink: 0 }}>Rs. {(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Subtotal</span>
                    <span style={{ fontSize: '10px', color: 'white' }}>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Shipping</span>
                    <span style={{ fontSize: '10px', color: shippingPrice === 0 ? '#C9A96E' : 'rgba(255,255,255,0.4)' }}>
                      {shippingPrice === 0 ? 'Free' : `Rs. ${shippingPrice}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' }}>Total</span>
                    <span style={{ fontSize: '14px', color: '#C9A96E', letterSpacing: '1px' }}>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '9px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    backgroundColor: loading ? '#8C8478' : '#C9A96E',
                    color: '#1A1A18',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>

                {shippingPrice === 0 && (
                  <p style={{ marginTop: '12px', fontSize: '8px', letterSpacing: '1px', color: '#C9A96E', textAlign: 'center' }}>✦ Free shipping applied</p>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutScreen;