import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // số user mỗi trang

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Tính toán dữ liệu phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="title">Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p className="no-users">Chưa có người dùng nào</p>
      ) : (
        <>
          <div className="user-grid">
            {currentUsers.map((user, idx) => (
              <div className="user-card" key={idx}>
                <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
                <div className="user-info">
                  <p><strong>Tên đăng nhập:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email || 'Không có'}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="pagination">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
