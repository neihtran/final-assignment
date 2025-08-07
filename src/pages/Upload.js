import React, { useState, useEffect } from 'react';
import './Upload.css';

function Upload() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    setImages(stored);
  }, []);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          const updated = [...images, ...newImages];
          setImages(updated);
          localStorage.setItem('uploadedImages', JSON.stringify(updated));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    localStorage.setItem('uploadedImages', JSON.stringify(updated));
  };

  return (
    <div className="container">
      <h2>Tải nhiều ảnh</h2>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      <div className="gallery">
        {images.map((img, index) => (
          <div className="image-wrapper" key={index}>
            <img src={img} alt={`upload-${index}`} />
            <button className="delete-btn" onClick={() => handleDelete(index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upload;
