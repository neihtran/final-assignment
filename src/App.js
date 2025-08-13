// src/App.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Components & Pages
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import './pages/Upload.css';
import './pages/About.css';

// Lazy load các trang ít dùng
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile   = lazy(() => import('./pages/Profile'));

// Auto scroll lên đầu khi đổi route
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null);

  // Khởi tạo user từ localStorage (hỗ trợ cả 'user' lẫn 'currentUser' để tương thích cũ)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const legacyUser = localStorage.getItem('currentUser');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else if (legacyUser) {
      try {
        const parsed = JSON.parse(legacyUser);
        setUser(parsed);
        // Đồng bộ sang key mới
        localStorage.setItem('user', JSON.stringify(parsed));
        localStorage.removeItem('currentUser');
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Google Analytics (nếu dùng GA4, thay ID bằng của bạn)
  useEffect(() => {
    // Nếu chưa có ID, bạn có thể comment 2 dòng dưới
    ReactGA.initialize('G-E9DQMZZTW3');
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar user={user} setUser={setUser} />
      <Suspense fallback={<div style={{textAlign:'center', padding:'20px'}}>Đang tải trang...</div>}>
        <Routes>
          {/* Trang chủ: hiển thị ảnh của tất cả người dùng (đã phân trang trong Home.js) */}
          <Route path="/" element={<Home />} />

          {/* About: chỉ caption nếu chưa login (truyền user để About biết trạng thái) */}
          <Route path="/about" element={<About user={user} />} />

          {/* Dashboard: danh sách toàn bộ người dùng (public) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Profile: thông tin đầy đủ của người dùng hiện tại */}
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />

          {/* Upload: chỉ cho user đã đăng nhập, truyền username để lưu ảnh theo user */}
          <Route
            path="/upload"
            element={user ? <Upload user={user.username} /> : <Navigate to="/login" replace />}
          />

          {/* Auth */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
