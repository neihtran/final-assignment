import React from "react";
import "./About.css";

function About({ user }) {
  return (
    <div className="container">
      <h2>MUỐN BIẾT Ở ĐÂY CÓ GÌ HÃY ĐỌC DÒNG Ở DƯỚI NHÉ 😗👍</h2>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        TUYỆT VỜI! Đây là nơi bạn có thể biết là web này tạo ra chỉ để bạn ném ảnh lên thôi 😂 Hẹ hẹ.
      </p>
      {!user && (
        <p style={{ fontStyle: "italic", color: "#777" }}>
          Hãy đăng nhập để trải nghiệm đầy đủ tính năng nhóe 👌.
        </p>
      )}
    </div>
  );
}

export default About;
