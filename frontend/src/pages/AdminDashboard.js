import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import API from '../api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    title: '',
    price: '',
    image: '',
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await axios.post(
      `${API}/api/products`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm({ title: '', price: '', image: '' });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

      <div className="admin-products">
        {products.map((p) => (
          <div className="admin-product" key={p._id}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <img src={p.image} width="60" alt="" />
              <div>
                <h4>{p.title}</h4>
                <p>${p.price}</p>
              </div>
            </div>

            <button onClick={() => deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;