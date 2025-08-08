import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          We are passionate about delivering high-quality solutions that make
          life easier for our clients. Our team works with dedication,
          creativity, and attention to detail to ensure the best possible
          results for every project we take on.
        </p>

        {/* Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to provide top-notch services and create value for
              our customers by combining innovation and expertise.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-600">
              We aim to be a trusted partner for individuals and businesses
              worldwide, delivering impactful solutions that last.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
            <p className="text-gray-600">
              With a blend of experience, creativity, and dedication, we ensure
              that every project we handle exceeds expectations.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default About;
