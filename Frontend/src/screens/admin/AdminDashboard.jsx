import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('/api/orders'),
          axios.get('/api/products'),
        ]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSales = orders.reduce((a, o) => a + (o.totalPrice || 0), 0);
  const activeOrders = orders.filter((o) => !o.isDelivered).length;
  const recentOrders = orders.slice(0, 5);

  const navLinks = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: '▦' },
    { label: 'Orders', path: '/admin/orderlist', icon: '◈' },
    { label: 'Products', path: '/admin/productlist', icon: '◉' },
    { label: 'Add Product', path: '/admin/product/create', icon: '+' },
  ];

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", display: 'flex', minHeight: '100vh', backgroundColor: '#F7F4EF' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: '220px', flexShrink: 0, backgroundColor: '#1A1A18', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        {/* Logo */}
        <div style={{ padding: '32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', letterSpacing: '6px', color: 'white', margin: 0 }}>AZAMS</h1>
          <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C9A96E', marginTop: '4px' }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav style={{ padding: '24px 0', flex: 1 }}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 24px', textDecoration: 'none',
              fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
              color: window.location.pathname === link.path ? '#C9A96E' : 'rgba(255,255,255,0.4)',
              backgroundColor: window.location.pathname === link.path ? 'rgba(201,169,110,0.08)' : 'transparent',
              borderLeft: window.location.pathname === link.path ? '2px solid #C9A96E' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: '14px' }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>Admin Panel</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: '#1A1A18', margin: '0 0 6px' }}>
            AZAMS <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Dashboard</em>
          </h1>
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478' }}>Welcome back, Admin</p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Sales', value: loading ? '...' : `Rs. ${totalSales.toLocaleString()}`, sub: `${orders.length} orders`, color: '#C9A96E' },
            { label: 'Active Orders', value: loading ? '...' : activeOrders, sub: 'Pending delivery', color: '#1A1A18' },
            { label: 'Inventory', value: loading ? '...' : products.length, sub: '0 products', color: '#8C8478' },
          ].map((stat) => (
            <div key={stat.label} style={{ backgroundColor: 'white', padding: '28px', borderBottom: `3px solid ${stat.color}` }}>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '12px' }}>{stat.label}</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#1A1A18', marginBottom: '6px', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: '9px', letterSpacing: '1px', color: '#8C8478' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '16px' }}>Quick Actions</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'View Orders', path: '/admin/orderlist', dark: true },
              { label: 'Manage Products', path: '/admin/productlist', dark: false },
              { label: 'Add Product', path: '/admin/product/create', dark: false },
            ].map((btn) => (
              <Link key={btn.path} to={btn.path} style={{
                padding: '11px 24px',
                fontSize: '9px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                backgroundColor: btn.dark ? '#1A1A18' : 'transparent',
                color: btn.dark ? 'white' : '#1A1A18',
                border: btn.dark ? 'none' : '1px solid #E2DDD5',
              }}>
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '8px', letterSpacing: '4px', textTransform: 'uppercase', color: '#8C8478' }}>Recent Orders</p>
            <Link to="/admin/orderlist" style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#C9A96E', textDecoration: 'none' }}>View All</Link>
          </div>

          <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', padding: '12px 20px', backgroundColor: '#1A1A18' }}>
              {['Customer', 'City', 'Total', 'Status'].map((h) => (
                <span key={h} style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{h}</span>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '2px' }}>Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#8C8478', fontSize: '10px', letterSpacing: '2px' }}>Koi order nahi abhi</div>
            ) : (
              recentOrders.map((order, i) => (
                <div key={order._id} style={{
                  display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr',
                  padding: '16px 20px',
                  borderBottom: '1px solid #F0EDE6',
                  backgroundColor: i % 2 === 0 ? 'white' : '#FDFCFA',
                  alignItems: 'center',
                }}>
                  <span style={{ fontSize: '11px', color: '#1A1A18', letterSpacing: '0.5px' }}>
                    {order.shippingAddress?.name || order.shippingAddress?.name || order.shippingAddress?.phone || '—'}
                  </span>
                  <span style={{ fontSize: '10px', color: '#8C8478', letterSpacing: '0.5px' }}>
                    {order.shippingAddress?.city || '—'}
                  </span>
                  <span style={{ fontSize: '11px', color: '#C9A96E', letterSpacing: '0.5px' }}>
                    Rs. {order.totalPrice?.toLocaleString()}
                  </span>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase',
                    padding: '4px 10px',
                    backgroundColor: order.isDelivered ? 'rgba(201,169,110,0.12)' : 'rgba(26,26,24,0.06)',
                    color: order.isDelivered ? '#C9A96E' : '#8C8478',
                    width: 'fit-content',
                  }}>
                    {order.isDelivered ? 'Delivered' : 'Pending'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;