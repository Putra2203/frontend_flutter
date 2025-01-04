import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://flutterbackend-production-affa.up.railway.app/api/products",
        {
          name,
          price,
          image,
        }
      );

      setLoading(false); // Matikan loading setelah menerima response

      // Menangani respons berdasarkan kode status HTTP
      if (response.status === 200) {
        setSuccessMessage("Product added successfully!"); // Pesan sukses untuk status 200
        navigate("/products"); // Redirect setelah sukses
      } else if (response.status === 201) {
        setSuccessMessage("Product created successfully!"); // Pesan sukses untuk status 201
        navigate("/products");
      } else {
        setError(`Unexpected status: ${response.status}`); // Pesan jika status tidak terduga
      }
    } catch (error) {
      setLoading(false); // Matikan loading saat terjadi error

      // Menangani kesalahan yang mungkin terjadi selama permintaan
      if (error.response) {
        // Jika server mengembalikan respons error
        const { status, data } = error.response;
        if (status === 400) {
          setError(`Bad Request: ${data.message || "Invalid input"}`);
        } else if (status === 404) {
          setError("Resource not found.");
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
          <label className="block">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
