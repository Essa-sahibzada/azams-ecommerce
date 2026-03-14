import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartFromStorage = localStorage.getItem('azams_cart')
    ? JSON.parse(localStorage.getItem('azams_cart'))
    : [];

  const [cartItems, setCartItems] = useState(cartFromStorage);

  useEffect(() => {
    localStorage.setItem('azams_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Qty +1
  const addToCart = (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: product.qty || 1 }]);
    }
  };

  // Qty +1 by id only
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((x) =>
        x._id === id ? { ...x, qty: x.qty + 1 } : x
      )
    );
  };

  // Qty -1
  const decreaseQty = (id) => {
    const existItem = cartItems.find((x) => x._id === id);
    if (!existItem) return;
    if (existItem.qty <= 1) {
      setCartItems(cartItems.filter((x) => x._id !== id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === id ? { ...x, qty: x.qty - 1 } : x
        )
      );
    }
  };

  // Remove completely
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  // Clear all
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);