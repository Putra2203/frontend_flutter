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
      // Validasi input sebelum dikirim
      if (!name || !price || !image) {
        setError("Please fill all fields and upload an image.");
        setLoading(false);
        return;
      }

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
        setTimeout(() => navigate("/products"), 2000); // Redirect setelah 2 detik
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
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Add New Product</h1>

      {/* Pesan Sukses */}
      {successMessage && (
        <div className="p-2 mb-4 text-white bg-green-500 rounded">
          {successMessage}
        </div>
      )}

      {/* Pesan Error */}
      {error && (
        <div className="p-2 mb-4 text-white bg-red-500 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
