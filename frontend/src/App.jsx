import { Navigate, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from '../src/pages/Signup.jsx';
import Login from './pages/Login.jsx';
import React, { useState } from 'react';
import RefrshHandler from './RefrshHandler.jsx';
import Home from './pages/Home.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import ResetPassowrd from './pages/ResetPassowrd.jsx';
import UserDashboard from './UserPages/UserDashboard.jsx';
import AdminDashboard from './AdminPages/AdminDashboard.jsx';
import ProtectedRoute from './Conditions/ProtectedRoute.jsx';
import Unauthorized from './Conditions/Unauthorized.jsx';
import Faqs from './pages/Faqs.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import StyleDetail from './Components/StyleDetail.jsx';
// import MyReviews from './Components/MyReview.jsx';  // <-- Import MyReviews here

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgetPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassowrd />} />

        {/* Private routes */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path="/styles/:id" element={<StyleDetail />} />
        <Route path='/faqs' element={<PrivateRoute element={<Faqs />} />} />
        <Route path='/about' element={<PrivateRoute element={<About />} />} />
        <Route path='/contact' element={<PrivateRoute element={<Contact />} />} />

        {/* Your Reviews protected route */}
        {/* <Route path='/my-reviews' element={<PrivateRoute element={<MyReviews />} />} /> */}

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
