// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { FaStar, FaRegStar, FaEdit, FaTrash } from "react-icons/fa";

// export default function MyReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editReviewId, setEditReviewId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [editRating, setEditRating] = useState(0);

//   const userId = localStorage.getItem("userId"); // from your localStorage

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.info("You must be logged in.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.get(
//         `http://localhost:3004/api/styles/reviews/user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setReviews(res.data.reviews);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch reviews.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEdit = (review) => {
//     setEditReviewId(review._id);
//     setEditText(review.text);
//     setEditRating(review.rating);
//   };

//   const cancelEdit = () => {
//     setEditReviewId(null);
//     setEditText("");
//     setEditRating(0);
//   };

//   const handleStarClick = (index) => {
//     setEditRating(index + 1);
//   };

//   const saveEdit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:3004/api/styles/reviews/${editReviewId}`,
//         {
//           text: editText,
//           rating: editRating,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Review updated!");
//       cancelEdit();
//       fetchReviews();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update review.");
//     }
//   };

//   const deleteReview = async (reviewId) => {
//     if (!window.confirm("Are you sure you want to delete this review?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(
//         `http://localhost:3004/api/styles/reviews/${reviewId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Review deleted!");
//       fetchReviews();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete review.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading your reviews...</div>;
//   }

//   if (reviews.length === 0) {
//     return <div className="text-center mt-10">No reviews found.</div>;
//   }

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={2500} />
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">My Reviews</h1>

//         {reviews.map((review) => (
//           <div
//             key={review._id}
//             className="border rounded p-4 mb-4 bg-white shadow"
//           >
//             <h2 className="text-xl font-semibold mb-2">{review.hijabStyle.name}</h2>
//             <img
//               src={review.hijabStyle.image}
//               alt={review.hijabStyle.name}
//               className="w-48 h-32 object-cover rounded mb-2"
//             />

//             {/* Show edit form if this review is being edited */}
//             {editReviewId === review._id ? (
//               <>
//                 <div className="flex space-x-1 mb-2">
//                   {[...Array(5)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => handleStarClick(i)}
//                       type="button"
//                       aria-label={`${i + 1} star`}
//                     >
//                       {i < editRating ? (
//                         <FaStar className="text-yellow-400 w-6 h-6" />
//                       ) : (
//                         <FaRegStar className="text-gray-400 w-6 h-6" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//                 <textarea
//                   className="w-full border rounded p-2 mb-2 resize-none focus:ring-2 focus:ring-blue-400"
//                   rows={3}
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                 />
//                 <div>
//                   <button
//                     onClick={saveEdit}
//                     className="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={cancelEdit}
//                     className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center space-x-2 mb-2">
//                   {[...Array(5)].map((_, i) =>
//                     i < review.rating ? (
//                       <FaStar key={i} className="text-yellow-400" />
//                     ) : (
//                       <FaRegStar key={i} className="text-gray-300" />
//                     )
//                   )}
//                   <span className="text-gray-600 text-sm">
//                     by You
//                   </span>
//                 </div>
//                 <p className="mb-4 whitespace-pre-line">{review.text || "No review text."}</p>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => startEdit(review)}
//                     className="flex items-center space-x-1 text-blue-600 hover:underline"
//                   >
//                     <FaEdit />
//                     <span>Edit</span>
//                   </button>
//                   <button
//                     onClick={() => deleteReview(review._id)}
//                     className="flex items-center space-x-1 text-red-600 hover:underline"
//                   >
//                     <FaTrash />
//                     <span>Delete</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
