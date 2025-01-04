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

  // URL backend
  const BASE_URL = "https://flutterbackend-production-affa.up.railway.app";

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setExistingImage(product.image); // Path gambar lama
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      if (image) {
        formData.append("image", image); // Tambahkan file gambar jika ada
      }

      await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
          {existingImage && (
            <img
              src={`${BASE_URL}/${existingImage}`}
              alt="Existing Product"
              className="w-full h-auto rounded mb-2"
            />
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
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
