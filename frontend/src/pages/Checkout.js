import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [toast, setToast] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.city || !formData.email) {
      setToast('Please fill all fields!');
      setTimeout(() => setToast(''), 2000);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user._id,
        items: cart.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          qty: item.qty,
          image: item.thumbnail
        })),
        total
      });

      setToast('Order placed successfully! 🎉');

      clearCart();

      // redirect to profile after short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (err) {
        console.error("FULL ERROR:", err.response?.data || err.message);
        setToast("Something went wrong 😭");
    }

    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="checkout-container">
      {toast && <div className="toast">{toast}</div>}

      <h2>Checkout</h2>

      <div className="checkout-grid">

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Your Cart</h3>
          {cart.length === 0 && <p>Cart is empty.</p>}
          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>${item.price} x {item.qty} = ${(item.price * item.qty).toFixed(2)}</p>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
            </div>
          ))}
          {cart.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
        </div>

        {/* Shipping Info */}
        <div className="shipping-form">
          <h3>Shipping Information</h3>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order 💳
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;