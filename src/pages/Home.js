// src/pages/Home.js
import React, { useEffect, useState } from 'react';

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    setImages(stored);
  }, []);

  return (
    <div className="container">
      <h1>Chào mừng đến Web App!</h1>
      {images.length > 0 && <h3>Ảnh đã đăng:</h3>}
      <div className="gallery">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`home-img-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
