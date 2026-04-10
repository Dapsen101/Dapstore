import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log("ERROR FETCHING PRODUCTS:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2>Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            
            <img
              src={product.image || product.thumbnail}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p className="price">${product.price}</p>

            <button
              className="btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;