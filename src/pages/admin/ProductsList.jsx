import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://flutterbackend-production-affa.up.railway.app/api/products");
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-4">
              <div className="p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>Price: ${product.image}</p>
                
                <div className="mt-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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
