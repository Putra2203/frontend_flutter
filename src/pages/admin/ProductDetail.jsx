import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // URL backend
  const BASE_URL = "https://flutterbackend-production-affa.up.railway.app";

  // Fetch product detail
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        await axios.delete(`${BASE_URL}/api/products/${id}`);
        alert("Product deleted successfully!");
        navigate("/products");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // Handle edit
  const handleEdit = () => {
    navigate(`/edit-products/${id}`);
  };

  return (
    <div className="container p-4 mx-auto">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : product ? (
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mb-4">Price: ${product.price}</p>

          {/* Tampilkan gambar produk */}
          {product.image ? (
            <img
              src={product.image} // Gunakan URL langsung dari GCS
              alt={product.name}
              className="w-full h-auto mb-4 rounded shadow"
            />
          ) : (
            <p>No image available</p>
          )}

          <button
            onClick={handleEdit}
            className="px-4 py-2 mt-2 text-white bg-yellow-500 rounded"
          >
            Edit Product
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 mt-2 ml-2 text-white bg-red-500 rounded"
          >
            Delete Product
          </button>
        </div>
      ) : (
        <div className="text-center">Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetail;
