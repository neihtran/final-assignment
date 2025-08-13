import React, { useEffect, useState } from 'react';
import './Upload.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // Lấy dữ liệu mới nhất từ danh sách users
      const allUsers = JSON.parse(localStorage.getItem('users')) || [];
      const latestUserData = allUsers.find(u => u.username === currentUser.username);
      setUser(latestUserData || currentUser);
    }
  }, []);

  if (!user) {
    return <p style={{ textAlign: 'center' }}>Bạn chưa đăng nhập.</p>;
  }

  return (
    <div className="upload-container">
      <h2>Thông tin cá nhân</h2>
      <p><strong>Tên đăng nhập:</strong> {user.username}</p>
      <p><strong>Số ảnh đã đăng:</strong> {user.images?.length || 0}</p>
      {/* Có thể thêm ngày đăng ký nếu muốn */}
      
      <h3>Ảnh đã đăng</h3>
      {user.images?.length > 0 ? (
        <div className="image-grid">
          {user.images.map((img, idx) => (
            <div key={idx} className="image-item">
              <img src={img} alt={`uploaded-${idx}`} />
            </div>
          ))}
        </div>
      ) : (
        <p>Bạn chưa đăng ảnh nào.</p>
      )}
    </div>
  );
}

export default Profile;
