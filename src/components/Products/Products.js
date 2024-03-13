// Products.js
import React, { useEffect, useState, useCallback } from 'react';
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc,query,where } from 'firebase/firestore';
import app from '../../firebase';
import '../../assets/styles/Products.css';
import Modal from './Modal';
import Add from './Add';

const fetchProducts = async () => {
  const db = getFirestore(app);
  const productsCollection = collection(db, 'Products');

  try {
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const handleAddProduct = async (newProductData, setProducts) => {
  const db = getFirestore(app);

  try {
    await addDoc(collection(db, 'Products'), newProductData);
    // After adding a new product, refetch the products to update the list
    const updatedProductsData = await fetchProducts();
    setProducts(updatedProductsData);
  } catch (error) {
    console.error('Error adding new product:', error);
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    const db = getFirestore(app);
    const productsCollection = collection(db, 'Products');
  
    try {
      // Find the document reference with the given productId in the 'Products' collection
      const productQuery = query(productsCollection, where('id', '==', productId));
      const productSnapshot = await getDocs(productQuery);
  
      if (!productSnapshot.empty) {
        // If the product with the specified id exists, delete it
        const productDocRef = productSnapshot.docs[0].ref;
        await deleteDoc(productDocRef);
  
        // After deleting a product, refetch the products to update the list
        const updatedProductsData = await fetchProducts();
        setProducts(updatedProductsData);
      } else {
        console.log('Error deleting product: Product not found');
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };
  

  const handleEdit = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    setAddProductModalOpen(false);
  }, []);

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

      </div>
  );
};

export { handleAddProduct };  // Export the handleAddProduct function
export default Products;
