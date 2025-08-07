// src/pages/Upload.js
import React, { useState, useEffect } from 'react';

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
          const updatedImages = [...images, ...newImages];
          setImages(updatedImages);
          localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container">
      <h2>Tải nhiều ảnh</h2>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      <div className="gallery">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`upload-${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Upload;
