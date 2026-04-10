import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css'; // make sure your styling lives here

const ProductCard = ({ product }) => {
  const { addToCart, increaseQty, decreaseQty, removeFromCart, cart } = useContext(CartContext);
  const inCart = cart.find(item => item.id === product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image"/>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>

      {!inCart && (
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      )}

      {inCart && (
        <div className="qty-controls">
          <button className="qty-btn" onClick={() => decreaseQty(product.id)}>-</button>
          <span className="qty">{inCart.qty}</span>
          <button className="qty-btn" onClick={() => increaseQty(product.id)}>+</button>
          <button className="remove-btn" onClick={() => removeFromCart(product.id)}>🗑️</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;