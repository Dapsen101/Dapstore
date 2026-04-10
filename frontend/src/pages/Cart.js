import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(CartContext);

  console.log(cart);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * (item.qty || 1),
    0
  );

  return (
    <div className="container">
      <h1 style={{ marginBottom: '20px' }}>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Cart is empty 😭</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              background: '#020617',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '15px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}>
              
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />

              <div style={{ flex: 1 }}>
                <h3>{item.title || item.name}</h3>

                <p>Price: ${item.price}</p>

                <p>
                     Subtotal: ${ (Number(item.price || 0) * (item.qty || 1)).toFixed(2) }
                </p>

                {/* QUANTITY CONTROLS */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button className="btn" onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.qty}</span>
                  <button className="btn" onClick={() => increaseQty(item._id)}>+</button>
                </div>
              </div>

              <button className="btn" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>

            </div>
          ))}

          <div style={{
            textAlign: 'center',
            fontSize: '22px',
            marginTop: '20px'
          }}>
            Total: ${total.toFixed(2)}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className="btn" onClick={() => navigate('/checkout')}>
              Checkout 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
