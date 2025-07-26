// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Thêm dòng này

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === username)) {
      alert('User already exists');
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10); // Băm mật khẩu
      users.push({ username, password: hashedPassword }); // Lưu mật khẩu đã băm
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
