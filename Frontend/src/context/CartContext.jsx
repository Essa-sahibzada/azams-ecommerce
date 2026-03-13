import React, { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext(); // ✅ export add kiya

export const CartProvider = ({ children }) => {
  const cartFromStorage = localStorage.getItem('azams_cart')
    ? JSON.parse(localStorage.getItem('azams_cart'))
    : [];

  const [cartItems, setCartItems] = useState(cartFromStorage);

  useEffect(() => {
    localStorage.setItem('azams_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id ? { ...product, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);