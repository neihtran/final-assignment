import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Lấy danh sách user
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    // Kiểm tra đăng nhập
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="upload-container">
      <h2>Tất cả ảnh của người dùng</h2>

      {users.map((user, idx) => (
        <div key={idx} className="user-section">
          <h3>{user.username}</h3>

          {isLoggedIn ? (
            // Đã đăng nhập → hiện đầy đủ ảnh
            <div className="image-grid">
              {(user.images && user.images.length > 0) ? (
                user.images.map((img, i) => (
                  <div key={i} className="image-item">
                    <img src={img} alt={`user-${idx}-img-${i}`} />
                  </div>
                ))
              ) : (
                <p style={{ color: '#888' }}>Người dùng chưa tải ảnh</p>
              )}
            </div>
          ) : (
            // Chưa đăng nhập → hiệu ứng chồng ảnh
            <div className="image-stack">
              {(user.images || []).slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="stack-img locked"
                  style={{ top: `${i * 8}px`, left: `${i * 8}px` }}
                >
                  <img src={img} alt={`preview-${i}`} />
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                  </div>
                </div>
              ))}
              {user.images && user.images.length > 3 && (
                <div className="more-overlay">
                  +{user.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
