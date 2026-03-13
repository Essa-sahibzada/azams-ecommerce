import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext'; // Cart Context import kiya

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* CartProvider ko App ke bahar wrap karne se poori website mein cart access ho jayega */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);