import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shippingPrice;
  const freeShipping = subtotal >= 5000;

  return (
    <div style={{ fontFamily: "'Josefin Sans', sans-serif", backgroundColor: typeof colors !== 'undefined' ? colors.bg : '#F7F4EF', minHeight: '100vh', transition: 'background 0.3s' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Josefin+Sans:wght@300;400&display=swap');`}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 32px' }}>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '10px' }}>Your</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, color: '#1A1A18', margin: 0 }}>
            Shopping <em style={{ fontStyle: 'italic', color: '#C9A96E' }}>Bag</em>
          </h1>
        </div>

        {/* Empty */}
        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', borderTop: '1px solid #E2DDD5', borderBottom: '1px solid #E2DDD5' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,169,110,0.3)', marginBottom: '16px' }}>Empty</p>
            <p style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '32px' }}>Tumhara bag khali hai</p>
            <Link to="/products" style={{ display: 'inline-block', backgroundColor: '#1A1A18', color: 'white', padding: '12px 32px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

            {/* LEFT: Items (flex:1) */}
            <div style={{ flex: 1 }}>
              <div style={{ borderTop: '1px solid #E2DDD5' }}>
                {cartItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '24px 0', borderBottom: '1px solid #E2DDD5' }}>

                    {/* Image */}
                    <Link to={`/product/${item._id}`} style={{ flexShrink: 0, display: 'block' }}>
                      <div style={{ width: '88px', height: '116px', backgroundColor: '#E8E2D8', overflow: 'hidden' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', marginBottom: '4px' }}>{item.category || 'Clothing'}</p>
                          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 300, color: '#1A1A18', marginBottom: '4px' }}>{item.name}</h3>
                          {item.size && <p style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478' }}>Size: {item.size}</p>}
                        </div>
                        <p style={{ fontSize: '12px', letterSpacing: '1px', color: '#C9A96E' }}>Rs. {(item.price * item.qty).toLocaleString()}</p>
                      </div>

                      {/* Qty + Remove */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2DDD5' }}>
                          <button onClick={() => decreaseQty(item._id)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', color: '#8C8478', fontSize: '16px' }}>−</button>
                          <span style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#1A1A18' }}>{item.qty}</span>
                          <button onClick={() => increaseQty(item._id)} style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', color: '#8C8478', fontSize: '16px' }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8C8478', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #E2DDD5', paddingBottom: '2px' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/products" style={{ display: 'inline-block', marginTop: '24px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8C8478', textDecoration: 'none', borderBottom: '1px solid #E2DDD5', paddingBottom: '2px' }}>
                ← Continue Shopping
              </Link>
            </div>

            {/* RIGHT: Summary (fixed width 320px) */}
            <div style={{ width: '320px', flexShrink: 0 }}>
              <div style={{ backgroundColor: '#1A1A18', padding: '32px', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)} items)</span>
                    <span style={{ fontSize: '10px', letterSpacing: '1px', color: 'white' }}>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>Shipping</span>
                    <span style={{ fontSize: '10px', color: freeShipping ? '#C9A96E' : 'rgba(255,255,255,0.4)' }}>{freeShipping ? 'Free' : `Rs. ${shippingPrice}`}</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' }}>Total</span>
                    <span style={{ fontSize: '12px', letterSpacing: '1px', color: '#C9A96E' }}>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  style={{ width: '100%', padding: '14px', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', backgroundColor: '#C9A96E', color: '#1A1A18', border: 'none', cursor: 'pointer' }}
                >
                  Proceed to Checkout
                </button>

                {!freeShipping && (
                  <p style={{ marginTop: '14px', fontSize: '8px', letterSpacing: '1px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.8 }}>
                    Rs. {(5000 - subtotal).toLocaleString()} Add more for free shipping.
                  </p>
                )}
                {freeShipping && (
                  <p style={{ marginTop: '14px', fontSize: '8px', letterSpacing: '1px', color: '#C9A96E', textAlign: 'center' }}>✦ Free shipping applied!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartScreen;