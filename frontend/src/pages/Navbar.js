import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">DapStore</Link>

      <div className="nav-links">
        {user ? (
          <>
            <span className="username">Hi, {user.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <Link to="/checkout" className="cart-icon">
          🛒
          {cart.length > 0 && <span className="cart-badge">{cart.reduce((sum, i) => sum + i.qty, 0)}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;