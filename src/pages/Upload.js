import React, { useState, useEffect } from 'react';
import './Upload.css';

function Upload({ user }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = allUsers.find(u => u.username === user);
    if (currentUser) {
      setImages(currentUser.images || []);
    }
  }, [user]);

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

          const allUsers = JSON.parse(localStorage.getItem('users')) || [];
          const currentUser = allUsers.find(u => u.username === user);
          if (currentUser) {
            currentUser.images = updated;
            localStorage.setItem('users', JSON.stringify(allUsers));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = allUsers.find(u => u.username === user);
    if (currentUser) {
      currentUser.images = updated;
      localStorage.setItem('users', JSON.stringify(allUsers));
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Ảnh - {user}</h2>
      <input type="file" multiple accept="image/*" onChange={handleUpload} />
      <div className="image-grid">
        {images.map((img, index) => (
          <div key={index} className="image-item">
            <img src={img} alt={`upload-${index}`} />
            <button className="delete-btn" onClick={() => handleDelete(index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upload;
