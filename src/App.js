// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Orders from './components/Orders/Orders';
import Header from './components/Header/Header.js';
import Calendar from './components/Calendar/Calendar.js'; // Import the Calendar component

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          {/* Redirect from root to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/calendar" element={<Calendar />} /> {/* Add Calendar route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
