// Add.js
import React, { useState } from 'react';

const Add = ({ isOpen, onClose, onSave }) => {
  const [newProduct, setNewProduct] = useState({
    id: Date.now().toString(),
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newProduct);
    setNewProduct({
      id: Date.now().toString(),
      name: '',
      price: '',
      stock: '',
      category: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Product</h2>
        <label>
          Name:
          <input type="text" name="name" value={newProduct.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={newProduct.price} onChange={handleChange} />
        </label>
        <label>
          Available Stocks:
          <input type="number" name="stock" value={newProduct.stock} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={newProduct.category} onChange={handleChange} />
        </label>
        <div className="action-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
