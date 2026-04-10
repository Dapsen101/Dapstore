import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${user._id}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  if (!user) return <p className="not-logged">Please log in to view your profile.</p>;

  return (
    <div className="profile-container">
      <h2>{user.name}'s Profile</h2>

      <div className="user-info">
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="orders">
        <h3>Order History</h3>

        {orders.length === 0 && <p>No past orders.</p>}

        {orders.map(order => (
          <div key={order._id} className="order-card">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>

            {order.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name} x {item.qty}</p>
                <p>${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;