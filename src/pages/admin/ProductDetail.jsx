import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://flutterbackend-production-affa.up.railway.app/api/products/${id}`
        );
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
      await axios.delete(
        `http://flutterbackend-production-affa.up.railway.app/api/products/${id}`
      );
      navigate("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-products/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mb-4">Price: ${product.price}</p>
          <p className="mb-4">imagePath: ${product.image}</p>
          
          <button
            onClick={handleEdit}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Edit Product
          </button>
          <button
            onClick={handleDelete}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded ml-2"
          >
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
