import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartBadge from './CartBadge';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // already redirects
  };

  return (
    <header className="header">
      <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        DapStore
      </h1>

      {user && (
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
        />
      )}

      {user && (
        <div className="nav-buttons">
          
          {/* 👑 ADMIN BUTTON */}
          {user.isAdmin && (
            <button onClick={() => navigate('/admin')}>
              Admin
            </button>
          )}

          <button onClick={handleLogout}>Logout</button>

          <CartBadge />

          <h3
            className="profile-btn"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            Hi, {user.name}
          </h3>
        </div>
      )}
    </header>
  );
};

export default Header;