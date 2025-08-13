import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [allImages, setAllImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 15;

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const merged = [];

    users.forEach(u => {
      (u.images || []).forEach(img => {
        merged.push({ user: u.username, img });
      });
    });

    setAllImages(merged);
  }, []);

  // Tính toán phân trang
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = allImages.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(allImages.length / imagesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="upload-container">
      <h2>Tất cả ảnh của người dùng</h2>

      <div className="image-grid">
        {currentImages.map((item, index) => (
          <div key={index} className="image-item">
            <img src={item.img} alt={`all-${index}`} />
            <p style={{ textAlign: 'center', margin: '5px 0' }}>{item.user}</p>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: '20px' }}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
