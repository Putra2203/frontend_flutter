import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://flutterbackend-production-affa.up.railway.app";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Product List</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4">
              <div className="p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>Price: ${product.price}</p>
                {/* Tampilkan gambar produk */}
                {product.image && (
                  <img
                    src={`${BASE_URL}/${product.image}`}
                    alt={product.name}
                    className="w-full h-auto mt-2"
                  />
                )}
                <div className="mt-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsList;
