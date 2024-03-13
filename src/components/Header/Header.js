// components/Header/Header.js

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../assets/styles/Header.css'; // Import the CSS file
import Add from '../../components/Products/Add'; // Import the Add component
import { handleAddProduct } from '../../components/Products/Products'; // Correct the import statement

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseModal = () => {
    setAddProductModalOpen(false);
  };

  const handleAddProductH = (newProduct) => {
    handleAddProduct(newProduct); 
    setAddProductModalOpen(false);
  };

  return (
    <header className="bg-gray-800 py-4">
      <div className={`container flex items-center justify-between ${menuOpen ? 'menu-open' : ''}`}>
        <Link to="/dashboard" className="logo-link text-white text-2xl font-bold">
          ERP System
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon cursor-pointer" onClick={toggleMenu}>
          <span className={`icon-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`icon-bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`icon-bar ${menuOpen ? 'open' : ''}`}></span>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <ul className="flex space-x-4">
            {isProductsPage && (
              <li>
                <button className="nav-link" onClick={() => setAddProductModalOpen(true)}>
                  Add New Product
                </button>
              </li>
            )}
            <li>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/orders" className="nav-link">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/calendar" className="nav-link">
                Calendar
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Render the modal for adding a new product */}
      <Add isOpen={isAddProductModalOpen} onClose={handleCloseModal} onSave={handleAddProductH} />
    </header>
  );
};

export default Header;
