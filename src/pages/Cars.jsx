import React from "react";
import CarCard from "../components/CarCard";
import HcarsData from "../assets/HcarsData";
import EcarsData from "../assets/EcarsData";
import Footer from "../components/footer";
import IcarsData from "../assets/IcarsData";

function Cars() {
  return (
    <div className="py-10 px-5 bg-black min-h-screen">
      <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center">
        Premium Car Collection
      </h2>
      <p className="font-medium text-center text-gray-500 mb-10 font-sans">Discover our exclusive fleet of luxury vehicles. Each car is meticulously maintained and ready <br /> for your journey.</p>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {HcarsData.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
      
      <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center mt-8">
        Exclusive Car Collection
      </h2>
      <p className="font-medium text-center text-gray-500 mb-10 font-sans">Discover our Top-Notch fleet of luxury vehicles. Each car is meticulously maintained and ready <br /> for your journey.</p>
      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {EcarsData.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>

      <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center mt-8">
        Indian Car Collection
      </h2>
      <p className="font-medium text-center text-gray-500 mb-10 font-sans">Check our Latest fleet of Ruged SUV vehicles. Each car is meticulously maintained and ready <br /> for your journey.</p>
      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {IcarsData.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Cars;
