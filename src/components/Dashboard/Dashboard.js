import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Chart from 'chart.js/auto';
import '../../assets/styles/Dashboard.css';

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const db = getFirestore();
      const productsCollection = collection(db, 'Products');
      const ordersCollection = collection(db, 'Orders');

      try {
        const productsSnapshot = await getDocs(productsCollection);
        const ordersSnapshot = await getDocs(ordersCollection);
        setTotalProducts(productsSnapshot.size);
        setTotalOrders(ordersSnapshot.size);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    renderPieChart();
  }, [totalProducts, totalOrders]);

  const renderPieChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById('trends-chart');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Products', 'Orders'],
        datasets: [{
          label: 'Trends',
          data: [totalProducts, totalOrders],
          backgroundColor: ['#4CAF50', '#2196F3'],
        }],
      },
    });
    setChartInstance(newChartInstance);
  };

  return (
    <div className="container mx-auto mt-8">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        {/* Cards for Total Products and Total Orders */}
        <div className="card-container">
          {/* Total Products Card */}
          <div className="card">
            <div className="card-content">
              <p className="text-xl font-bold mb-4">Total Products</p>
              <p className="text-gray-600">{totalProducts}</p>
            </div>
            <div className="card-action">
              <Link to="/products" className="btn">Go to Products</Link>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="card">
            <div className="card-content">
              <p className="text-xl font-bold mb-4">Total Orders</p>
              <p className="text-gray-600">{totalOrders}</p>
            </div>
            <div className="card-action">
              <Link to="/orders" className="btn">Go to Orders</Link>
            </div>
          </div>
        </div>
      </section>
      {/* Trends Section */}
      <section className="mb-8">
        <div className="chart-container">
          <h3 className="text-xl font-bold mb-4">Trends</h3>
          <canvas id="trends-chart" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
