import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllPosts() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [drawerOpenId, setDrawerOpenId] = useState(null);

  // Form data for each style's review
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_Backend_url}/api/styles`);
      setStyles(res.data);
    } catch (err) {
      toast.error("Error fetching styles.");
      console.error("Error fetching styles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (styleId, index) => {
    setFormData((prev) => ({
      ...prev,
      [styleId]: {
        ...prev[styleId],
        rating: index + 1,
      },
    }));
  };

  const handleInputChange = (styleId, e) => {
    const text = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [styleId]: {
        ...prev[styleId],
        text,
      },
    }));
  };

  const handleSubmitReview = async (styleId) => {
    const data = formData[styleId] || {};
    if (!data.rating || data.rating === 0) {
      toast.warning("Please select a rating.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.info("You must be logged in to submit a review.");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_Backend_url}/api/styles/${styleId}/reviews`,
        {
          rating: data.rating,
          text: data.text || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review submitted!");
      setDrawerOpenId(null);
      setFormData((prev) => {
        const copy = { ...prev };
        delete copy[styleId];
        return copy;
      });

      fetchStyles();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Loading styles...</div>
    );
  }

  if (styles.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">No styles found.</div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Hijab Styles Gallery
        </h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {styles.map((style) => {
            // const data = formData[style._id] || { rating: 0, text: "" };
            return (
              <div
                key={style._id}
                className="border rounded shadow p-4 flex flex-col hover:shadow-lg transition cursor-pointer bg-white"
                onClick={() => navigate(`/styles/${style._id}`)}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-xl font-semibold mt-4">{style.name}</h2>
                <p className="text-gray-600 mt-2 flex-grow">{style.description}</p>

                {/* Rating Display */}
                <div className="mt-4 flex items-center space-x-2">
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(style.avgRating) ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300" />
                    )
                  )}
                  <span className="text-gray-600 text-sm">
                    ({style.reviewsCount} reviews)
                  </span>
                </div>

                {/* Add Review Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDrawerOpenId(drawerOpenId === style._id ? null : style._id);
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {drawerOpenId === style._id ? "Cancel Review" : "Add Review"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${drawerOpenId ? "translate-x-0" : "translate-x-full"}`}
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.15)" }}
      >
        {drawerOpenId && (
          <ReviewDrawer
            styleId={drawerOpenId}
            formData={formData[drawerOpenId] || { rating: 0, text: "" }}
            onStarClick={handleStarClick}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitReview}
            onClose={() => setDrawerOpenId(null)}
          />
        )}
      </div>
    </>
  );
}

function ReviewDrawer({ styleId, formData, onStarClick, onInputChange, onSubmit, onClose }) {
  return (
    <div className="flex flex-col h-full p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Close review form"
      >
        <FaTimes size={24} />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Add Your Review</h2>

      <div className="flex space-x-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => onStarClick(styleId, i)}
            type="button"
            className="focus:outline-none"
            aria-label={`${i + 1} star`}
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
        className="w-full border rounded p-3 mb-4 resize-none focus:ring-2 focus:ring-blue-400 h-40"
        placeholder="Write your review..."
        value={formData.text}
        onChange={(e) => onInputChange(styleId, e)}
      />

      <button
        onClick={() => onSubmit(styleId)}
        className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Submit Review
      </button>
    </div>
  );
}
