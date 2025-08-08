import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('UserLoggedIn');
    if (user) {
      try {
        // Agar JSON string hai to parse karlo warna direct set kar do
        const parsedUser = JSON.parse(user);
        setLoggedInUser(parsedUser);
      } catch {
        setLoggedInUser(user);
      }
    }
  }, []);

  const handleSuccess = (msg) => toast.success(msg);

  const handleLogout = () => {
    if (!localStorage.getItem('token')) return;
    localStorage.removeItem('token');
    localStorage.removeItem('UserLoggedIn');
    localStorage.removeItem('userRole');
    setLoggedInUser(null);  // Logout par state clear karna zaruri hai
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  const handleProfileRedirect = () => {
    const role = localStorage.getItem("userRole") || "user";
    toast.info(`Redirecting to ${role === "admin" ? "Admin" : "User"} Dashboard...`);
    setTimeout(() => {
      navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    }, 500);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 flex justify-between items-center relative shadow-lg z-50">
      {/* Left - Logo */}
      <div
        className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={() => navigate('/')}
      >
        My<span className="text-yellow-300">Website</span>
      </div>

      {/* Center - Desktop Nav Links */}
      <ul className="hidden md:flex space-x-8 font-medium relative items-center">
        {['Home', 'FAQs', 'About', 'Contact'].map((item) => (
          <li key={item} className="relative group cursor-pointer">
            <span
              onClick={() => navigate(`/${item.toLowerCase()}`)}
              className="hover:text-yellow-300 transition duration-300"
            >
              {item}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}

        {/* Products Dropdown */}
        <li
          className="relative group cursor-pointer"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="hover:text-yellow-300 transition duration-300">Products</span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>

          {showDropdown && (
            <ul className="absolute top-8 left-0 w-48 bg-white text-gray-700 shadow-lg rounded-md py-2 z-20">
              {['All Products', 'New Arrivals', 'Best Sellers'].map((subItem) => (
                <li
                  key={subItem}
                  className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all"
                  onClick={() =>
                    navigate(`/products/${subItem.toLowerCase().replace(' ', '-')}`)
                  }
                >
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      {/* Right - Desktop Icons */}
      <div className="hidden md:flex items-center space-x-5 text-lg">
        <FaUser
          className="hover:text-yellow-300 cursor-pointer transition transform hover:scale-110"
          title="Profile"
          onClick={handleProfileRedirect}
        />
        <FaHeart
          className="hover:text-yellow-300 cursor-pointer transition transform hover:scale-110"
          title="Wishlist"
          onClick={() => navigate('/wishlist')}
        />
        <FaShoppingCart
          className="hover:text-yellow-300 cursor-pointer transition transform hover:scale-110"
          title="Cart"
          onClick={() => navigate('/cart')}
        />
        <FaSignOutAlt
          className="hover:text-red-300 cursor-pointer transition transform hover:scale-110"
          title="Logout"
          onClick={handleLogout}
        />
      </div>

      {/* Burger Menu (Mobile) */}
      <div
        className="md:hidden text-2xl cursor-pointer hover:text-yellow-300"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FaBars />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md md:hidden py-4 px-6 space-y-4 z-40">
          {['Home', 'FAQs', 'About', 'Contact'].map((item) => (
            <p
              key={item}
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => {
                navigate(`/${item.toLowerCase()}`);
                setShowMobileMenu(false);
              }}
            >
              {item}
            </p>
          ))}
          <p
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => {
              navigate('/products/all-products');
              setShowMobileMenu(false);
            }}
          >
            Products
          </p>
          <div className="flex space-x-6 pt-3 text-xl">
            <FaUser
              className="hover:text-yellow-300 cursor-pointer"
              title="Profile"
              onClick={() => {
                handleProfileRedirect();
                setShowMobileMenu(false);
              }}
            />
            <FaHeart
              className="hover:text-yellow-300 cursor-pointer"
              title="Wishlist"
              onClick={() => {
                navigate('/wishlist');
                setShowMobileMenu(false);
              }}
            />
            <FaShoppingCart
              className="hover:text-yellow-300 cursor-pointer"
              title="Cart"
              onClick={() => {
                navigate('/cart');
                setShowMobileMenu(false);
              }}
            />
            <FaSignOutAlt
              className="hover:text-red-300 cursor-pointer"
              title="Logout"
              onClick={() => {
                handleLogout();
                setShowMobileMenu(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
