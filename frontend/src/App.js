import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import CheckoutPage from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute';

// 🔥 Wrapper to use useLocation safely
const AppContent = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<LoginPage />} />

        {/* PROTECTED */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

        {/* 👑 ADMIN */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

console.log("APP.JS LOADED");

console.log("APP.JS LOADED");