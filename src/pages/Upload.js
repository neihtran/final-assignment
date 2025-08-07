import React, { useState, useEffect } from 'react';

function Upload() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('uploadedImage');
    if (stored) setImage(stored);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('uploadedImage', reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h1>Upload Image Demo</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Image:</h3>
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}

export default Upload;
