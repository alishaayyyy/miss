import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Text */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>

        {/* Tagline or Extra Info */}
        <p className="text-sm text-center md:text-right">
          Built with ❤️ and dedication.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
