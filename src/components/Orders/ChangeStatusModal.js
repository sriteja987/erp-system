// ChangeStatusModal.js
import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../firebase';

const ChangeStatusModal = ({ isOpen, onClose, orderId, onStatusChange }) => {
  const [newStatus, setNewStatus] = useState([]);

  const handleChangeStatus = async () => {
    const db = getFirestore(app);

    try {
      // Update the status in the Firestore document
      console.log(orderId);
      const OrderCollection = collection(db, 'Orders');
      const q = query(OrderCollection, where('id', '==', orderId));
      const querySnapshot = await getDocs(q);
      const orderDoc = querySnapshot.docs[0];
      await updateDoc(orderDoc.ref, { status: newStatus });
      // Close the modal after updating the status
      onClose();
      // Notify the parent component about the status change
      onStatusChange(newStatus);
      // Reset the newStatus state when the modal is closed
      setNewStatus(newStatus);
      // Show an alert
      alert('Order status updated successfully!');
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Change Order Status</h2>
        <label>
          New Status:
          <input
            type="text"
            name="newStatus"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </label>
        <div className="action-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleChangeStatus}>Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusModal;
