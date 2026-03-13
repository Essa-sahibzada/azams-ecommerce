import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import HomeNavbar from "./component/HomeNavbar";
import Footer from "./component/Footer";

// Screens
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import LoginScreen from "./screens/LoginScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import CartScreen from "./screens/CartScreen";
import ProductsScreen from "./screens/ProductsScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Admin Screens
import AdminLayout from "./screens/admin/AdminLayout";
import AdminDashboard from "./screens/admin/AdminDashboard";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductCreateScreen from "./screens/admin/ProductCreateScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";

// Admin routes pe Navbar/Footer mat dikhao
const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <HomeNavbar />}

      <main className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/order-success" element={<OrderSuccessScreen />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/productlist" element={<AdminLayout><ProductListScreen /></AdminLayout>} />
          <Route path="/admin/product/create" element={<AdminLayout><ProductCreateScreen /></AdminLayout>} />
          <Route path="/admin/orderlist" element={<AdminLayout><OrderListScreen /></AdminLayout>} />
          <Route path="/admin/product/:id/edit" element={<AdminLayout><ProductEditScreen /></AdminLayout>} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;