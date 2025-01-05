import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL backend
  const BASE_URL = "https://flutterbackend-production-affa.up.railway.app";

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setExistingImage(product.image); // URL GCS langsung
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      if (image) {
        formData.append("image", image); // Tambahkan file gambar baru jika ada
      }

      await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Existing Image:</label>
          {existingImage ? (
            <img
              src={existingImage} // URL GCS langsung
              alt="Existing Product"
              className="w-full h-auto mb-2 rounded"
            />
          ) : (
            <p>No existing image available.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block">New Image (optional):</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
