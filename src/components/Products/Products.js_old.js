// Products.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import app from '../../firebase';
import '../../assets/styles/Products.css';
import Modal from './Modal';
import Add from './Add';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore(app);
      const productsCollection = collection(db, 'Products');

      try {
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const db = getFirestore(app);
    const productRef = doc(db, 'Products', productId);

    try {
      await deleteDoc(productRef);
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = async (newProductData) => {
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, 'Products'), newProductData);
      setAddProductModalOpen(false);
      // After adding a new product, refetch the products to update the list
      const updatedProductsSnapshot = await getDocs(collection(db, 'Products'));
      const updatedProductsData = updatedProductsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(updatedProductsData);
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setAddProductModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div key={product.id} className="square-card">
          <div className="card-content">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-gray-600">{product.category}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>

            <div className="action-buttons">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}

      {/* Render the modal for editing existing product */}
      <Modal isOpen={!!selectedProduct} onClose={handleCloseModal} product={selectedProduct} />

      {/* Render the modal for adding a new product */}
      <button onClick={() => setAddProductModalOpen(true)}>Add New Product</button>
      <Add isOpen={isAddProductModalOpen} onClose={handleCloseModal} onSave={handleAddProduct} />
    </div>
  );
};

export default Products;