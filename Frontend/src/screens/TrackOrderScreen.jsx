import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const TrackOrderScreen = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const trackHandler = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return setError('Enter Order ID.');
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/orders/${orderId.trim()}`);
      setOrder(data);
    } catch (err) {
      setError('Order not found. Please check the Order ID.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { label: 'Order Placed', icon: '✦', done: true },
    { label: 'Processing', icon: '◈', done: true },
    { label: 'Shipped', icon: '◉', done: order?.isDelivered },
    { label: 'Delivered', icon: '✓', done: order?.isDelivered },
  ];

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: '#F7F4EF', minHeight: '100vh' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '80px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '12px' }}>AZAMS</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, color: '#1A1A18', margin: '0 0 12px' }}>
            Track <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Order</em>
          </h1>
          <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#8C8478', lineHeight: 2 }}>
           Enter your Order ID to view your order details.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={trackHandler} style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            <input
              type="text"
              placeholder="Enter Order ID..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              style={{
                flex: 1, padding: '14px 16px', fontSize: '11px', letterSpacing: '1px',
                backgroundColor: 'white', border: '1px solid #E2DDD5',
                borderRight: 'none', outline: 'none', color: '#1A1A18',
                fontFamily: "'Josefin Sans', sans-serif",
              }}
            />
            <button type="submit" disabled={loading} style={{
              padding: '14px 28px', fontSize: '9px', letterSpacing: '3px',
              textTransform: 'uppercase', backgroundColor: '#1A1A18',
              color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Josefin Sans', sans-serif", whiteSpace: 'nowrap',
            }}>
              {loading ? '...' : 'Track'}
            </button>
          </div>
          {error && (
            <p style={{ fontSize: '10px', letterSpacing: '1px', color: '#ef4444', marginTop: '10px' }}>{error}</p>
          )}
        </form>

        {/* Order Result */}
        {order && (
          <div style={{ backgroundColor: 'white', padding: '32px' }}>

            {/* Order Info */}
            <div style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid #E2DDD5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px' }}>Order ID</p>
                  <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#1A1A18' }}>#{order._id?.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px' }}>Status</p>
                  <span style={{
                    fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '5px 12px',
                    backgroundColor: order.isDelivered ? 'rgba(201,169,110,0.12)' : 'rgba(26,26,24,0.06)',
                    color: order.isDelivered ? '#C9A96E' : '#8C8478',
                  }}>
                    {order.isDelivered ? '✓ Delivered' : 'In Progress'}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '6px' }}>Total</p>
                  <p style={{ fontSize: '14px', color: '#C9A96E', letterSpacing: '1px' }}>Rs. {order.totalPrice?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '20px' }}>Order Progress</p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {steps.map((step, i) => (
                  <React.Fragment key={step.label}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: step.done ? '#C9A96E' : '#E2DDD5',
                        color: step.done ? '#1A1A18' : '#8C8478',
                        fontSize: '12px', fontWeight: 600,
                        transition: 'all 0.3s',
                      }}>{step.icon}</div>
                      <p style={{ fontSize: '7px', letterSpacing: '1px', textTransform: 'uppercase', color: step.done ? '#1A1A18' : '#8C8478', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {step.label}
                      </p>
                    </div>
                    {i < steps.length - 1 && (
                      <div style={{ flex: 1, height: '2px', backgroundColor: steps[i + 1].done ? '#C9A96E' : '#E2DDD5', margin: '0 4px 20px' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #E2DDD5' }}>
                <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '12px' }}>Shipping Address</p>
                <p style={{ fontSize: '11px', color: '#1A1A18', letterSpacing: '0.5px', lineHeight: 2 }}>
                  {order.shippingAddress.name && <><strong>{order.shippingAddress.name}</strong><br /></>}
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}<br />
                  {order.shippingAddress.phone}
                </p>
              </div>
            )}

            {/* Order Items */}
            <div>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '16px' }}>Items</p>
              {order.orderItems?.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '60px', backgroundColor: '#E8E2D8', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 300, color: '#1A1A18', marginBottom: '2px' }}>{item.name}</p>
                    <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#8C8478' }}>Qty: {item.qty}</p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#C9A96E' }}>Rs. {(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Note */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#8C8478', lineHeight: 2 }}>
            The Order ID would have been provided in your order confirmation.<br />
         Any problem? <a href="mailto:support@azams.com" style={{ color: '#C9A96E', textDecoration: 'none', borderBottom: '1px solid #C9A96E' }}>support@azams.com</a> pe contact karein.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TrackOrderScreen;