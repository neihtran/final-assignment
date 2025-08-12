import React, { useState, useEffect } from "react";
import "./About.css";

function About({ user }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <h2>About Us Page</h2>
      {!user && (
        <p style={{ fontStyle: "italic", color: "#555" }}>
          Ở đây chỉ là nơi để bạn cho chúng tôi thấy ảnh của bạn.
        </p>
      )}
      <h3>Danh sách người dùng đã đăng ký:</h3>
      {users.length === 0 ? (
        <p>Chưa có người dùng nào đăng ký.</p>
      ) : (
        <>
          <ul>
            {currentUsers.map((u, index) => (
              <li key={index}>{u.username}</li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)}>{"<"}</button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)}>{">"}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
