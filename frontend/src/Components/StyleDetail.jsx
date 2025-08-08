import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaArrowLeft } from "react-icons/fa";

export default function StyleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [style, setStyle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Review form state
  const [formData, setFormData] = useState({ rating: 0, text: "" });

  // Drawer open state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchStyleDetail = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_Backend_url}/api/styles/${id}`);
        setStyle(res.data.style);
        setReviews(res.data.reviews.slice(0, 5)); // show only last 5 reviews
        setAvgRating(res.data.avgRating);
      } catch (error) {
        console.error("Error fetching style detail:", error);
        alert("Style not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchStyleDetail();
  }, [id, navigate]);

  const handleStarClick = (index) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleSubmitReview = async () => {
    if (formData.rating === 0) {
      alert("Please select a rating.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit a review.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_Backend_url}/api/styles/${id}/reviews`,
        { rating: formData.rating, text: formData.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Review submitted!");
      setFormData({ rating: 0, text: "" });
      setIsDrawerOpen(false); // close drawer on submit

      // Refresh reviews
      const res = await axios.get(`${import.meta.env.VITE_Backend_url}/api/styles/${id}`);
      setReviews(res.data.reviews.slice(0, 5));
      setAvgRating(res.data.avgRating);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading style details...</div>;
  }

  if (!style) {
    return null; // or a fallback UI
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      {/* Main content: flex container for desktop, stack on mobile */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Style Card Left */}
        <div className="md:w-1/2 border rounded shadow p-6 mb-8 md:mb-0">
          <img
            src={style.image}
            alt={style.name}
            className="w-full h-72 object-cover rounded"
          />
          <h1 className="text-3xl font-bold mt-4">{style.name}</h1>
          <p className="text-gray-700 mt-2">{style.description}</p>

          <div className="mt-4 flex items-center space-x-2">
            {[...Array(5)].map((_, i) =>
              i < Math.round(avgRating) ? (
                <FaStar key={i} className="text-yellow-400" />
              ) : (
                <FaRegStar key={i} className="text-gray-300" />
              )
            )}
            <span className="text-gray-600 text-sm">({reviews.length} reviews shown)</span>
          </div>
        </div>

        {/* Reviews Right */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Latest Reviews</h2>
          {reviews.length === 0 && (
            <p className="text-gray-600">No reviews yet.</p>
          )}
          {reviews.map((rev) => (
            <div key={rev._id} className="border-b py-3">
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) =>
                  i < rev.rating ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300" />
                  )
                )}
                <span className="text-gray-800 font-semibold">{rev.userName || "Anonymous"}</span>
              </div>
              <p className="text-gray-700 mt-1">{rev.text}</p>
            </div>
          ))}

          {/* Add Review Button */}
          <div className="mt-8">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Your Review
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ zIndex: 1000 }}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add Your Review</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            aria-label="Close drawer"
          >
            &times;
          </button>
        </div>

        {/* Drawer Content - review form */}
        <div className="p-4">
          <div className="flex space-x-1 mb-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleStarClick(i)}
                type="button"
                className="focus:outline-none"
              >
                {i < formData.rating ? (
                  <FaStar className="text-yellow-400 w-8 h-8" />
                ) : (
                  <FaRegStar className="text-gray-400 w-8 h-8" />
                )}
              </button>
            ))}
          </div>
          <textarea
            className="w-full border rounded p-3 mb-4 resize-none"
            rows={4}
            placeholder="Write your review..."
            value={formData.text}
            onChange={handleInputChange}
          ></textarea>
          <button
            onClick={handleSubmitReview}
            className="w-full px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
