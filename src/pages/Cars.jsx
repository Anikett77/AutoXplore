import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import Footer from "../components/footer";
import { getCars } from "../api/cars";

function Cars() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await getCars();
        const cars = res.data || [];
        
        console.log('📊 Total cars from API:', cars.length);
        console.log('📂 Categories found:', [...new Set(cars.map(c => c.category))]);
        
        setAllCars(cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setAllCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [refreshKey]);

  const handleBookingSuccess = () => {
    console.log("🔄 Refreshing cars after booking...");
    setRefreshKey(prev => prev + 1);
  };

  const premiumCars = allCars.filter(car => car.category === 'Premium');
  const exclusiveCars = allCars.filter(car => car.category === 'Exclusive');
  const indianCars = allCars.filter(car => car.category === 'Indian');

  if (loading) {
    return (
      <div className="py-10 px-5 bg-black min-h-screen flex items-center justify-center">
        <p className="text-orange-500 text-xl">Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="pt-30 px-5 bg-black min-h-screen">
      {premiumCars.length > 0 && (
        <>
          <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center">
            Premium Car Collection
          </h2>
          <p className="font-medium text-center text-gray-500 mb-10 font-sans">
            Discover our exclusive fleet of luxury vehicles. Each car is meticulously maintained and ready <br /> for your journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {premiumCars.map((car) => (
              <CarCard key={car._id} car={car} onBookingSuccess={handleBookingSuccess} />
            ))}
          </div>
        </>
      )}

      {exclusiveCars.length > 0 && (
        <>
          <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center mt-8">
            Exclusive Car Collection
          </h2>
          <p className="font-medium text-center text-gray-500 mb-10 font-sans">
            Discover our Top-Notch fleet of luxury vehicles. Each car is meticulously maintained and ready <br /> for your journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {exclusiveCars.map((car) => (
              <CarCard key={car._id} car={car} onBookingSuccess={handleBookingSuccess} />
            ))}
          </div>
        </>
      )}

      {indianCars.length > 0 && (
        <>
          <h2 className="text-5xl font-bold text-orange-500 mb-3 text-center mt-8">
            Indian Car Collection
          </h2>
          <p className="font-medium text-center text-gray-500 mb-10 font-sans">
            Check our Latest fleet of Rugged SUV vehicles. Each car is meticulously maintained and ready <br /> for your journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {indianCars.map((car) => (
              <CarCard key={car._id} car={car} onBookingSuccess={handleBookingSuccess} />
            ))}
          </div>
        </>
      )}

      <Footer/>
    </div>
  );
}

export default Cars;