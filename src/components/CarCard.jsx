import React, { useState } from "react";
import BookingModal from "../pages/BookingModal";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function CarCard({ car, onBookingSuccess }) {
  const [showModal, setShowModal] = useState(false);
  
  const carName = car.name || `${car.make || ''} ${car.model || ''}`.trim() || 'Car';
  const carPrice = car.price || car.dailyRate || 0;
  const carType = car.type || car.category || 'Sedan';
  const carYear = car.year || '';
  
  let carImage = "https://via.placeholder.com/400x300?text=No+Image";

  if (car.image) {
    const imgStr = String(car.image).trim();
    
    if (
      !imgStr.includes("/") &&
      (imgStr.endsWith(".jpg") ||
        imgStr.endsWith(".png") ||
        imgStr.endsWith(".jpeg"))
    ) {
      carImage = `${API_URL}/uploads/cars/${imgStr}`;
    } else if (imgStr.startsWith("http") || imgStr.startsWith("/src")) {
      carImage = imgStr;
    } else {
      carImage = `${API_URL}/uploads/cars/${imgStr}`;
    }
  }
  
  const carSeats = car.seats || 4;
  const carFuel = car.fuel || car.fuelType || 'Gasoline';
  const carMileage = car.mileage || 0;
  const carTransmission = car.transmission || 'Automatic';
  
  const isAvailable = car.isAvailable !== undefined 
    ? car.isAvailable 
    : (car.status === "available" || car.status === undefined);

  const handleBookingSuccess = () => {
    setShowModal(false);
    if (onBookingSuccess) {
      onBookingSuccess(); // Trigger refresh in parent
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-black/60 to-black/90 rounded-2xl border border-[#222] hover:border-orange-500 transition-all duration-300 overflow-hidden shadow-md w-full max-w-[320px] mx-auto flex flex-col justify-between hover:scale-[1.05]">

        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded-md">
              Available
            </span>
          ) : (
            <div className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-md font-semibold">
              Unavailable
              {car.availability?.until && (
                <div className="text-xs">
                  Until {new Date(car.availability.until).toLocaleDateString()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-800">
          <img 
            src={carImage}
            alt={carName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>

        <span className="absolute right-3 bottom-39 bg-orange-500/20 text-orange-400 text-sm font-semibold px-3 py-1 rounded-full font-sans">
          ${carPrice || "N/A"}/day
        </span>

        <div className="p-5 text-white">
          <h3 className="text-lg font-semibold my-2">{carName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-gray-800 text-yellow-400 px-2 py-0.5 rounded-full">
              {carType}
            </span>
            {carYear && <span className="text-xs text-gray-400">{carYear}</span>}
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-4 font-sans">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 px-2 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-users w-4 h-4 text-gray-500 stroke-amber-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
              </div>
              <p className="font-medium">{carSeats}</p>
              <span className="text-xs text-gray-400">Seats</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 px-2 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-fuel w-4 h-4 text-gray-500 stroke-amber-500">
                  <line x1="3" x2="15" y1="22" y2="22"></line>
                  <line x1="4" x2="14" y1="9" y2="9"></line>
                  <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path>
                  <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path>
                </svg>
              </div>
              <p className="font-medium">{carFuel}</p>
              <span className="text-xs text-gray-400">Fuel</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 px-2 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-gauge w-4 h-4 text-gray-500 stroke-amber-500">
                  <path d="m12 14 4-4"></path>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                </svg>
              </div>
              <p className="font-medium">{carMileage}</p>
              <span className="text-xs text-gray-400">Mileage</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-gray-800 px-2 py-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-circle-check-big w-4 h-4 text-gray-500 stroke-amber-500">
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
              </div>
              <p className="font-medium">{carTransmission}</p>
              <span className="text-xs text-gray-400">Trans</span>
            </div>
          </div>

          <button
            className={`mt-5 w-full py-2 rounded-md text-sm font-semibold shadow-md 
              ${isAvailable
                ? "bg-gradient-to-r from-orange-400 to-orange-600 hover:scale-105 transition"
                : "bg-orange-900 text-gray-300 cursor-not-allowed"
            }`}
            disabled={!isAvailable}
            onClick={() => setShowModal(true)}
          >
            {isAvailable ? "Book Now" : "Unavailable"}
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal 
          show={showModal} 
          onClose={() => setShowModal(false)} 
          car={car}
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  );
}

export default CarCard;