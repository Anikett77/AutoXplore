import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Logo from "../assets/logocar.png";

function Footer() {
  return (
    <footer className="bg-[#02060f] text-white pt-12 pb-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* --- Brand Info --- */}
        <div>
          <div className="flex items-center space-x-0">
            <img src={Logo} alt="AutoXplore" className="h-10" />
            <h1 className="text-2xl font-bold text-white">AutoXplore</h1>
          </div>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Premium car rental service with the latest models and exceptional
            customer service. Drive your dream car today!
          </p>

          <div className="flex space-x-3 mt-4">
            <a href="#" className="bg-[#1c2230] p-3 rounded-full hover:bg-orange-600">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#1c2230] p-3 rounded-full hover:bg-orange-600">
              <FaTwitter />
            </a>
            <a href="#" className="bg-[#1c2230] p-3 rounded-full hover:bg-orange-600">
              <FaInstagram />
            </a>
            <a href="#" className="bg-[#1c2230] p-3 rounded-full hover:bg-orange-600">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-[#1c2230] p-3 rounded-full hover:bg-orange-600">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 border-b-2 border-orange-500 inline-block">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-gray-300">
            <li><a href="/">Home</a></li>
            <li><a href="/cars">Cars</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 border-b-2 border-orange-500 inline-block">
            Contact Us
          </h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center gap-2"><FiMapPin /> 123 Drive Avenue, Auto City, CA 90210</li>
            <li className="flex items-center gap-2"><FiPhone /> +91 8299431275</li>
            <li className="flex items-center gap-2"><FiMail /> info@hexagonservices.com</li>
          </ul>

          <div className="mt-4">
            <h4 className="font-semibold mb-3">Business Hours</h4>
            <p className="text-gray-400 text-sm mb-1">Mon-Fri: 8:00 AM - 8:00 PM</p>
            <p className="text-gray-400 text-sm mb-1">Sat: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-400 text-sm mb-1">Sun: 10:00 AM - 4:00 PM</p>
          </div>
        </div>

        {/* ----- Newsletter ----- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 border-b-2 border-orange-500 inline-block">
            Newsletter
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe for special offers and updates
          </p>
          <div className="flex flex-col gap-2 mr-18">
            <input
              type="email"
              placeholder="Your Email Address"
              className="p-3 rounded-md text-gray-100 w-full border-1 border-gray-500 bg-gray-800"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-3 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        © 2025 KARZONE. All rights reserved. | Designed by{" "}
        <a href="#" className="text-orange-500 hover:underline">Hexagon Digital Services</a>
      </div>
      
      
      <div className="container mx-auto px-4 text-center">
        <a 
          href="/admin-login" 
          className="text-gray-400 hover:text-white text-sm"
        >
          Admin
        </a>
      </div>
    </footer>
    
  );
}

export default Footer;
