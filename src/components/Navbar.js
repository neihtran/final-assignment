import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |
          <Link to="/profile">Profile</Link> |
          <Link to="/upload">Upload Ảnh</Link> |
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
