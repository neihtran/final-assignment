import React, { useEffect, useState } from 'react';
import './Home.css'; // file css mới cho phân trang

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4; // số user mỗi trang

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setIsLoggedIn(!!(currentUser && currentUser.username));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="upload-container">
      <h2>Tất cả ảnh của người dùng</h2>

      {currentUsers.map((user, idx) => (
        <div key={idx} className="user-section">
          <h3>{user.username}</h3>
          {isLoggedIn ? (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
