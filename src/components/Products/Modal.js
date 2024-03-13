import React, { useState } from 'react';
import { getFirestore, updateDoc, doc, setDoc, query, where, getDocs,collection } from 'firebase/firestore';
import app from '../../firebase';
import '../../assets/styles/Modal.css';

const Modal = ({ isOpen, onClose, product }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const db = getFirestore(app);

    try {
      if (!product || !product.id) {
        console.error('Error updating product: Invalid product or product ID.');
        return;
      }

      // Construct a query to find the document with the specified field (e.g., 'id')
      const productsCollection = collection(db, 'Products');
      const q = query(productsCollection, where('id', '==', product.id));

      // Execute the query and get the snapshot
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        // If the document with the specified field is found, update it using updateDoc
        const productDoc = querySnapshot.docs[0];
        await updateDoc(productDoc.ref, editedProduct);
        console.log('Product updated successfully:', editedProduct);
      } else {
        // If no matching document is found, create a new one using setDoc
        await setDoc(doc(db, 'Products'), editedProduct);
        console.log('Product created successfully:', editedProduct);
      }

      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Product</h2>
        <label>
          Name:
          <input type="text" name="name" value={editedProduct.name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={editedProduct.price} onChange={handleChange} />
        </label>
        <label>
          Available Stocks:
          <input type="number" name="stock" value={editedProduct.stock} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={editedProduct.category} onChange={handleChange} />
        </label>
        <div className="action-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
