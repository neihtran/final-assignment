import React from "react";
import "./About.css";

function About({ user }) {
  return (
    <div className="container">
      <h2>About Us</h2>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        Đây là trang giới thiệu, nơi bạn có thể biết là web này tạo ra chỉ để bạn ném ảnh lên thôi 😂.
      </p>
      {!user && (
        <p style={{ fontStyle: "italic", color: "#777" }}>
          Hãy đăng nhập để trải nghiệm đầy đủ tính năng.
        </p>
      )}
    </div>
  );
}

export default About;
