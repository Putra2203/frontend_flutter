import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "https://flutterbackend-production-affa.up.railway.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image); // Menambahkan file gambar

      const response = await axios.post(`${BASE_URL}/api/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);

      // Menampilkan pesan sukses dan redirect ke halaman produk
      if (response.status === 201) {
        setSuccessMessage("Product added successfully!");
        navigate("/products");
      }
    } catch (error) {
      setLoading(false);

      // Menangani kesalahan
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setError(`Bad Request: ${data.message || "Invalid input"}`);
        } else if (status === 500) {
          setError("Internal Server Error. Please try again later.");
        } else {
          setError(`Unexpected error: ${status}`);
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      {/* Pesan Sukses */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}

      {/* Pesan Error */}
      {error && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>
      )}

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
          <label className="block">Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
