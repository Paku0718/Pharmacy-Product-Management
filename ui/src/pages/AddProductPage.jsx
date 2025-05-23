import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      productId,
      productDescription,
      productPrice,
      productQuantity
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        toast.success('Product added successfully');
        navigate('/products');
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      toast.error('An error occurred while adding the product');
    }
  };

  return (
    <section className="max-h-screen flex items-center justify-center bg-teal-50 px-4 mb-12">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-teal-700 text-center mb-4">Add Product</h2>
        <form onSubmit={submitForm} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product ID</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Quantity</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              rows="2"
              className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none resize-none"
              placeholder="Short description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Price</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-md transition-all"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProductPage;
