import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import OrderDetailsModal from '../Orders/OrderDetailsModal';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import app from '../../firebase';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore(app);
      const ordersCollection = collection(db, 'Orders');

      try {
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          date: doc.data().order_date.toDate(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setOrderDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setOrderDetailsModalOpen(false);
  };

  const tileContent = ({ date }) => {
    const ordersForDate = orders.filter(order => {
      console.log(order.id);
      const orderDate = new Date(order.date);
      return orderDate.getDate() === date.getDate() &&
             orderDate.getMonth() === date.getMonth() &&
             orderDate.getFullYear() === date.getFullYear();
    });

    return ordersForDate.length > 0 ? (
      <ul>
        {ordersForDate.map(order => (
          <li key={order.id}>{`Order: ${order.id}`}</li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div>
      <h2>Calendar</h2>
      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        tileContent={tileContent}
      />
      <OrderDetailsModal isOpen={isOrderDetailsModalOpen} onClose={handleCloseModal} date={selectedDate} />
    </div>
  );
};

export default CalendarComponent;
