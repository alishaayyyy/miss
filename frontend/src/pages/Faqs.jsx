import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // ✅ React Icons
import Navbar from "../Components/Navbar"; // Your Navbar
import Footer from "../Components/Footer";

const faqsData = [
  {
    question: "What is the full form of HTML?",
    answer: "HTML stands for HyperText Markup Language.",
  },
  {
    question: "What is the use of CSS?",
    answer:
      "CSS is used to style web pages — including colors, fonts, and layouts.",
  },
  {
    question: "What does 'algorithm' mean?",
    answer:
      "An algorithm is a step-by-step set of instructions to solve a problem.",
  },
  {
    question: "What is the difference between the Internet and the WWW?",
    answer:
      "The Internet is a network of networks, while the World Wide Web (WWW) is a service that runs on the Internet.",
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="w-5 h-5" />
                ) : (
                  <FaChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Faqs;
