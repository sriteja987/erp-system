// components/Orders/OrderDetailsModal.js

import React from 'react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Order Details</h2>
        <p>Order ID: {order.id}</p>
        <p>Customer: {order.customer_name}</p>
        <p>Date: {order.order_date.toDate().toLocaleDateString()}</p>
        <p>Status: {order.status}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
