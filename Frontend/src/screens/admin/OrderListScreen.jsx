import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const markDelivered = async (id) => {
    try {
      await axios.put(`/api/orders/${id}/deliver`);
      setOrders(orders.map((o) => o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date() } : o));
    } catch (err) {
      alert('Update fail ho gaya');
    }
  };

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#F7F4EF' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>
      <Sidebar />

      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Admin Panel</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
              Orders <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>List</em>
            </h1>
          </div>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>
            {orders.length} Total Orders
          </p>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1.2fr 1fr 1.2fr 0.8fr 0.8fr 1fr',
            padding: '14px 20px',
            backgroundColor: '#1A1A18',
            gap: '8px',
          }}>
            {['Order ID', 'Customer', 'City', 'Phone', 'Amount', 'Status', 'Action'].map((h) => (
              <span key={h} style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Koi order nahi abhi
            </div>
          ) : (
            orders.map((order, i) => (
              <div key={order._id} style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1.2fr 1fr 1.2fr 0.8fr 0.8fr 1fr',
                padding: '16px 20px',
                borderBottom: '1px solid #F0EDE6',
                backgroundColor: i % 2 === 0 ? 'white' : '#FDFCFA',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ fontSize: '10px', color: '#8C8478', fontFamily: 'monospace' }}>
                  #{order._id?.slice(-6).toUpperCase()}
                </span>
                <span style={{ fontSize: '11px', color: '#1A1A18' }}>
                  {order.shippingAddress?.name || '—'}
                </span>
                <span style={{ fontSize: '11px', color: '#1A1A18' }}>
                  {order.shippingAddress?.city || '—'}
                </span>
                <span style={{ fontSize: '11px', color: '#8C8478' }}>
                  {order.shippingAddress?.name || '—'}
                </span>
                <span style={{ fontSize: '11px', color: '#C9A96E', letterSpacing: '0.5px' }}>
                  Rs. {order.totalPrice?.toLocaleString()}
                </span>
                <span style={{
                  display: 'inline-block',
                  fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '4px 10px',
                  backgroundColor: order.isDelivered ? 'rgba(201,169,110,0.12)' : 'rgba(26,26,24,0.05)',
                  color: order.isDelivered ? '#C9A96E' : '#8C8478',
                  width: 'fit-content',
                }}>
                  {order.isDelivered ? '✓ Done' : 'Pending'}
                </span>
                <div>
                  {!order.isDelivered ? (
                    <button
                      onClick={() => markDelivered(order._id)}
                      style={{
                        padding: '7px 14px',
                        fontSize: '7px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        backgroundColor: '#1A1A18',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: "'Josefin Sans', sans-serif",
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Mark Delivered
                    </button>
                  ) : (
                    <span style={{ fontSize: '9px', letterSpacing: '1px', color: '#C9A96E' }}>✦ Delivered</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderListScreen;