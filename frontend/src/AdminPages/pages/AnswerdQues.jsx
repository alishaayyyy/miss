import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

export default function AnswerdQues() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state for editing
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ rating: 0, text: "" });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const fetchUserReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3004/api/styles/reviews/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        alert("Failed to load your reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [token, userId]);

  const openEditDrawer = (review) => {
    setEditingReview(review);
    setFormData({ rating: review.rating, text: review.text });
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingReview(null);
    setFormData({ rating: 0, text: "" });
  };

  const handleStarClick = (index) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleUpdateReview = async () => {
    if (formData.rating < 1) {
      alert("Please select a rating.");
      return;
    }
    if (!editingReview) return;

    try {
      await axios.put(
        `http://localhost:3004/api/styles/${editingReview.hijabStyle._id}/reviews/${editingReview._id}`,
        { rating: formData.rating, text: formData.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review updated!");
      // Update local list
      setReviews((prev) =>
        prev.map((r) =>
          r._id === editingReview._id ? { ...r, rating: formData.rating, text: formData.text } : r
        )
      );
      closeDrawer();
    } catch (err) {
      console.error("Failed to update review:", err);
      alert("Failed to update review.");
    }
  };

  const handleDeleteReview = async (reviewId, styleId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(
        `http://localhost:3004/api/styles/${styleId}/reviews/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Review deleted!");
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error("Failed to delete review:", err);
      alert("Failed to delete review.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your reviews...</p>;

  if (!token || !userId) {
    return <p className="text-center mt-10">You must be logged in to see your reviews.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Reviews</h1>

      {reviews.length === 0 && <p>You have not written any reviews yet.</p>}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded p-4 mb-4 flex justify-between items-start"
        >
          <div>
            <h2 className="text-xl font-semibold">
              {review.hijabStyle?.name || "Unknown Style"}
            </h2>
            {review.hijabStyle?.image && (
              <img
                src={review.hijabStyle.image}
                alt={review.hijabStyle.name}
                className="w-24 h-24 object-cover rounded mt-2"
              />
            )}

            <div className="flex items-center mt-2 space-x-1">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={i} className="text-gray-300" />
                )
              )}
            </div>

            <p className="mt-2">{review.text || "(No comment)"}</p>
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            <button
              onClick={() => openEditDrawer(review)}
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
            >
              <FaEdit /> <span>Edit</span>
            </button>
            <button
              onClick={() => handleDeleteReview(review._id, review.hijabStyle._id)}
              className="text-red-600 hover:text-red-800 flex items-center space-x-1"
            >
              <FaTrash /> <span>Delete</span>
            </button>
          </div>
        </div>
      ))}

      {/* Drawer for editing review */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Review</h2>
          <button
            onClick={closeDrawer}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
            aria-label="Close drawer"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-center space-x-1 mb-4">
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
            placeholder="Update your review..."
            value={formData.text}
            onChange={handleInputChange}
          ></textarea>

          <button
            onClick={handleUpdateReview}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update Review
          </button>
        </div>
      </div>
    </div>
  );
}
