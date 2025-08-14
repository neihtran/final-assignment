import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(loggedInUser);
      setFormData(loggedInUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.map(u => u.username === user.username ? formData : u);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(formData));
    setUser(formData);
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản?')) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users = users.filter(u => u.username !== user.username);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <h2 className="title">Thông tin cá nhân</h2>
      <div className="profile-card">
        <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
        <div className="profile-info">
          {editMode ? (
            <>
              <p><strong>Tên đăng nhập:</strong> <input name="username" value={formData.username} onChange={handleChange} /></p>
              <p><strong>Email:</strong> <input name="email" value={formData.email || ''} onChange={handleChange} /></p>
              <p><strong>Ngày đăng ký:</strong> <input name="registerDate" value={formData.registerDate || ''} onChange={handleChange} /></p>
              <div className="btn-group">
                <button className="btn save" onClick={handleSave}>💾 Lưu</button>
                <button className="btn cancel" onClick={() => setEditMode(false)}>❌ Hủy</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Tên đăng nhập:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Ngày đăng ký:</strong> {user.registerDate}</p>
              <div className="btn-group">
                <button className="btn edit" onClick={() => setEditMode(true)}>✏️ Chỉnh sửa</button>
                <button className="btn delete" onClick={handleDelete}>🗑 Xóa tài khoản</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
