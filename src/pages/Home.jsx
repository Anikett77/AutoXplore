import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CarCard from "../components/CarCard";
import comaIcon from "../assets/coma.svg";
import starIcon from "../assets/star.svg";
import Footer from "../components/footer";
import { getCars } from "../api/cars";
import carsData from "../assets/carsData";

function Home() {
  const [dbCars, setDbCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await getCars({ limit: 6 }); // Show only 6 cars on home
        // API returns { page, pages, total, data: [...] }
        setDbCars(res.data?.data || res.data || []);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setDbCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Combine static cars with database cars (show first 6 from static, then database)
  const allCars = [...carsData.slice(0, 6), ...dbCars].slice(0, 6);

  return (
    <>
      <HeroSection />

      {/* Premium Fleet Section */}
      <section id="fleet" className="relative z-20 text-center text-white">
        {/* Button */}
        <button className="bg-gray-900 border border-gray-700 text-yellow-400 px-6 py-2 rounded-full shadow-md hover:scale-105 transition-all flex items-center justify-center mx-auto gap-2">
          ⚡ Premium Fleet Selection
        </button>

        {/* Title */}
        <h2 className="text-5xl font-bold text-orange-500 mt-6">
          Luxury Car Collection
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
          Discover premium vehicles with exceptional performance and comfort for your next journey
        </p>

        {/* Cars Grid */}
        {loading ? (
          <div className="mt-12 text-center">
            <p className="text-gray-400">Loading cars...</p>
          </div>
        ) : allCars.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-gray-400">No cars available at the moment.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 pb-2">
            {allCars.map((car, index) => (
              <CarCard key={car._id || car.id || `static-${index}`} car={car} />
            ))}
          </div>
        )}

        
      </section>
      {/* Premium Fleet Section */}
      <section className="relative z-10 text-center text-white mt-4">
        {/* Button */}
        <button className="bg-gray-900 border border-gray-700 text-yellow-400 px-6 py-2 rounded-full shadow-md hover:scale-105 transition-all flex items-center justify-center mx-auto gap-2">
          ⚡ Customers Experiences
        </button>

        {/* Title */}
        <h2 style={{ fontFamily: 'PlayfairDisplay' }} className="text-6xl font-bold text-orange-500 mt-6">
          Premium Drive Experiences
        </h2>

        <div className=" flex justify-center mt-3">
          <div className="bg-orange-600 h-0.75 w-30 mt-5.5 rounded-2xl"></div>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-3 ml-5 mt-2.5" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M256 25C128.3 25 25 128.3 25 256s103.3 231 231 231 231-103.3 231-231S383.7 25 256 25zm0 30c110.9 0 201 90.1 201 201s-90.1 201-201 201S55 366.9 55 256 145.1 55 256 55zM80.52 203.9c-4.71 19.2-7.52 37-7.52 54 144.7 30.3 121.5 62.4 148 177.8 11.4 2.1 23 3.3 35 3.3s23.6-1.2 35-3.3c26.5-115.4 3.3-147.5 148-177.8-.6-18.9-3-38.4-7.5-54C346.7 182.7 301.1 172 256 172c-45.1 0-90.7 10.7-175.48 31.9zM256 183c40.2 0 73 32.8 73 73s-32.8 73-73 73-73-32.8-73-73 32.8-73 73-73zm0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55 55-24.5 55-55-24.5-55-55-55z"></path></svg>
          <div className="bg-orange-600 h-0.75 w-30 mt-5.5 rounded-2xl"></div>
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
          Hear from our valued customers about their journey with our premium fleet
        </p>

        {/* customers experience boxes */}
        <div className=" w-auto h-auto flex justify-center gap-10 mt-15">
          
          <div className="bg-gray-950 w-100 h-100 rounded-2xl overflow-hidden hover:-translate-y-1 transform duration-300 ">
             <div className="bg-amber-950 w-16 h-16 mx-90 my-[-20px] rotate-45"></div> 
             <div className="flex mt-3" > <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 ml-7" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
 <svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1 ml-50" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
  </div>
              <p className="text-lg mt-8 text-left ml-8 text-gray-300"> "The BMW 5 Series was impeccable! <br /> Smooth ride and excellent service with <br /> ample space. Will definitely rent again." </p>
              <div className="rounded-xl w-80 h-10 bg-gray-800 ml-10 mt-10 flex "> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-3 ml-5 mt-2.5" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M256 25C128.3 25 25 128.3 25 256s103.3 231 231 231 231-103.3 231-231S383.7 25 256 25zm0 30c110.9 0 201 90.1 201 201s-90.1 201-201 201S55 366.9 55 256 145.1 55 256 55zM80.52 203.9c-4.71 19.2-7.52 37-7.52 54 144.7 30.3 121.5 62.4 148 177.8 11.4 2.1 23 3.3 35 3.3s23.6-1.2 35-3.3c26.5-115.4 3.3-147.5 148-177.8-.6-18.9-3-38.4-7.5-54C346.7 182.7 301.1 172 256 172c-45.1 0-90.7 10.7-175.48 31.9zM256 183c40.2 0 73 32.8 73 73s-32.8 73-73 73-73-32.8-73-73 32.8-73 73-73zm0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55 55-24.5 55-55-24.5-55-55-55z"></path></svg> <p className="mt-2 text-orange-400 font-medium">BMW 5 Series</p></div>
              <div className="flex items-center"><div className="bg-orange-600 w-15 h-15 rounded-4xl flex ml-8 mt-7 "><p className="mt-4 ml-6 font-medium text-xl">A</p> </div><p className="ml-5 mt-6 font-medium flex flex-col">Aniruddha Dubey <p className="font-normal text-orange-400 text-sm">Business Traveller</p> </p> </div>

              </div>
          <div className="bg-gray-950 w-100 h-100 rounded-2xl overflow-hidden hover:-translate-y-1 transform duration-300"><div className="bg-amber-950 w-16 h-16 mx-90 my-[-20px] rotate-45"></div>
          <div className="flex mt-3" > <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 ml-7" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
 <svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1 ml-50" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="text-gray-700 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path></svg>
  </div>
  <p className="text-lg mt-8 text-left ml-8 text-gray-300"> "Perfect family Toyota Highlander with <br /> ample space. Clean, well-maintained, and <br /> great value for money." </p>
  <div className="rounded-xl w-80 h-10 bg-gray-800 ml-10 mt-10 flex "> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-3 ml-5 mt-2.5" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M256 25C128.3 25 25 128.3 25 256s103.3 231 231 231 231-103.3 231-231S383.7 25 256 25zm0 30c110.9 0 201 90.1 201 201s-90.1 201-201 201S55 366.9 55 256 145.1 55 256 55zM80.52 203.9c-4.71 19.2-7.52 37-7.52 54 144.7 30.3 121.5 62.4 148 177.8 11.4 2.1 23 3.3 35 3.3s23.6-1.2 35-3.3c26.5-115.4 3.3-147.5 148-177.8-.6-18.9-3-38.4-7.5-54C346.7 182.7 301.1 172 256 172c-45.1 0-90.7 10.7-175.48 31.9zM256 183c40.2 0 73 32.8 73 73s-32.8 73-73 73-73-32.8-73-73 32.8-73 73-73zm0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55 55-24.5 55-55-24.5-55-55-55z"></path></svg> <p className="mt-2 text-orange-400 font-medium">Toyota Highlander</p></div>
  <div className="flex items-center"><div className="bg-orange-600 w-15 h-15 rounded-4xl flex ml-8 mt-7 "><p className="mt-4 ml-6 font-medium text-xl">H</p> </div><p className="ml-5 mt-6 font-medium flex flex-col">Harshit Sharma <p className="font-normal text-orange-400 text-sm">Family Vacation</p> </p> </div>

  </div>
          <div className="bg-gray-950 w-100 h-100 rounded-2xl overflow-hidden hover:-translate-y-1 transform duration-300"><div className="bg-amber-950 w-16 h-16 mx-90 my-[-20px] rotate-45"></div>
          <div className="flex mt-3" > <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 ml-7" height="28" width="28" xmlns="http://www.w3.org/2000/svg"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path></svg>
 <svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1 ml-50" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg><svg stroke="currentColor" fill="currentColor"  stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-1" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>
  </div>
  <p className="text-lg mt-8 text-left ml-8 text-gray-300"> "Convertible Ford Mustang made our <br /> coastal drive unforgettable! 24/7 support <br /> was a lifesaver and value for money. ." </p>
<div className="rounded-xl w-80 h-10 bg-gray-800 ml-10 mt-10 flex "> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-3 ml-5 mt-2.5" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M256 25C128.3 25 25 128.3 25 256s103.3 231 231 231 231-103.3 231-231S383.7 25 256 25zm0 30c110.9 0 201 90.1 201 201s-90.1 201-201 201S55 366.9 55 256 145.1 55 256 55zM80.52 203.9c-4.71 19.2-7.52 37-7.52 54 144.7 30.3 121.5 62.4 148 177.8 11.4 2.1 23 3.3 35 3.3s23.6-1.2 35-3.3c26.5-115.4 3.3-147.5 148-177.8-.6-18.9-3-38.4-7.5-54C346.7 182.7 301.1 172 256 172c-45.1 0-90.7 10.7-175.48 31.9zM256 183c40.2 0 73 32.8 73 73s-32.8 73-73 73-73-32.8-73-73 32.8-73 73-73zm0 18c-30.5 0-55 24.5-55 55s24.5 55 55 55 55-24.5 55-55-24.5-55-55-55z"></path></svg> <p className="mt-2 text-orange-400 font-medium">Ford Mustang</p></div>

  <div className="flex items-center"><div className="bg-orange-600 w-15 h-15 rounded-4xl flex ml-8 mt-7 "><p className="mt-4 ml-6 font-medium text-xl">S</p> </div><p className="ml-5 mt-6 font-medium flex flex-col">Satvinder Singh <p className="font-normal text-orange-400 text-sm">Road Trip Enthusiast</p> </p> </div>
  </div>
        </div>

        {/* Data */}
        <div className="bg-gray-800 my-20 mx-25 w-auto h-35 rounded-2xl border-1 border-gray-600">
          <div className="flex justify-around mt-7">
            <p className="text-5xl text-blue-300 font-bold">10k+ <p className="text-sm mt-2 font-medium">Happy Customers</p></p>
            <p className="text-5xl text-amber-300 font-bold">250+ <p className="text-sm mt-2 font-medium">Luxury Vehicles</p></p>
            <p className="text-5xl text-purple-400 font-bold">24/7 <p className="text-sm mt-2 font-medium">Support</p></p>
            <p className="text-5xl text-green-300 font-bold">50+ <p className="text-sm mt-2 font-medium">Locations</p></p>
          </div>
        </div>

        {/* Ending */}
        <div><p className="text-3xl">Ready for Your Premium Experience?</p>
          <p className="text-sm mt-5 text-gray-400">Join thousands of satisfied customers who have experienced our premium fleet and exceptional service.</p>
          <button className="bg-orange-600 py-2 px-7 mt-7 rounded-3xl mb-20">Book Your Luxury Ride</button>
          <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent z-0"></div>
        </div>
        
      </section>
      <Footer />
    </>
  );
}

export default Home;
