import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// User Protected Route — sirf logged in users ke liye
export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Loading state
  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: "'Josefin Sans', sans-serif",
        fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
        color: '#8C8478', backgroundColor: '#F7F4EF',
      }}>
        Loading...
      </div>
    );
  }

  // Not logged in — login pe bhejo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Protected Route — sirf admin ke liye
export const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('azamsAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};