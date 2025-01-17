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

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-products/${id}`);
  };

  return (
    <div className="p-4 mx-auto">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : product ? (
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mb-4">Price: ${product.price}</p>

          {/* Tampilkan gambar produk */}
          {product.image && (
            <div className="h-40 w-60 bg-slate-300">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-auto mb-4 rounded shadow"
              />
            </div>
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
