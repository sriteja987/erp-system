// Orders.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs,where,query, deleteDoc } from 'firebase/firestore';
import app from '../../firebase';
import OrderDetailsModal from './OrderDetailsModal';
import ChangeStatusModal from './ChangeStatusModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [isChangeStatusModalOpen, setChangeStatusModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore(app);
      const ordersCollection = collection(db, 'Orders');

      try {
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsModalOpen(true);
  };

  const handleUpdateOrderStatus = (order) => {
    setSelectedOrder(order);
    setChangeStatusModalOpen(true);
  };

  const handleDeleteOrder = async (orderId) => {
    const db = getFirestore(app);

    try {
      const OrderCollection = collection(db, 'Orders');
      const q = query(OrderCollection, where('id', '==', orderId));
      const querySnapshot = await getDocs(q);
      const orderDoc = querySnapshot.docs[0];

      await deleteDoc(orderDoc.ref);
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      alert(`Order with ID: ${orderId} deleted Successfully.`);
    } catch (error) {
      alert('Error deleting order:', error);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Find the order in the state and update its status
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <li key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-xl font-bold">Order ID: {order.id}</p>
            <p className="text-gray-600">Customer: {order.customer_name}</p>
            <p className="text-gray-600">Date: {order.order_date.toDate().toLocaleDateString()}</p>
            <p className="text-gray-600">Status: {order.status}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => handleViewOrderDetails(order)}
            >
              View Details
            </button>
            <button
              className="bg-green-500 hover.bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleUpdateOrderStatus(order)}
            >
              Update Status
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleDeleteOrder(order.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isOrderDetailsModalOpen}
        onClose={() => setOrderDetailsModalOpen(false)}
        order={selectedOrder}
      />

      {/* Change Status Modal */}
      <ChangeStatusModal
        isOpen={isChangeStatusModalOpen}
        onClose={() => setChangeStatusModalOpen(false)}
        orderId={selectedOrder?.id}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Orders;
