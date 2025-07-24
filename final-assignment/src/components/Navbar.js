import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |
      {user ? (
        <>
          <Link to="/dashboard">Dashboard</Link> |
          <Link to="/profile">Profile</Link> |
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
