import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          You can reach out to us using the details below.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Our Address</h2>
            <p className="text-gray-600">123 Street Name, City, Country</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Email Us</h2>
            <p className="text-gray-600">support@example.com</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Call Us</h2>
            <p className="text-gray-600">+123 456 7890</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
