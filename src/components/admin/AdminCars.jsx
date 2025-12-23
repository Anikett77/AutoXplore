import React, { useState, useEffect } from 'react';
import carsData from '../../assets/carsData';
import EcarsData from '../../assets/EcarsData';
import IcarsData from '../../assets/IcarsData';
import HcarsData from '../../assets/HcarsData';

const categories = ['All', 'SUV', 'Sedan', 'Convertible'];

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editCarId, setEditCarId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', type: '', price: '' });

  useEffect(() => {
    const combined = [...carsData, ...EcarsData, ...IcarsData, ...HcarsData];
    setCars(combined);
  }, []);

  const filteredCars = selectedCategory === 'All'
    ? cars
    : cars.filter(car => car.type === selectedCategory);

  const handleEditClick = (car) => {
    setEditCarId(car.id);
    setEditForm({ name: car.name, type: car.type, price: car.price });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    setCars(cars.map(car =>
      car.id === editCarId ? { ...car, ...editForm } : car
    ));
    setEditCarId(null);
  };

  const handleCancelClick = () => {
    setEditCarId(null);
  };

  const handleDeleteClick = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };
  
  return (
    <div>
      <h1 className='text-orange-400 font-extrabold font-sans justify-center mt-35 flex text-5xl '>Fleet Management</h1>
      <p className='text-gray-400 flex justify-center mt-7 font-sans'>Manage your entire fleet, track bookings, and monitor vehicle status in real-time</p>
      <div className='bg-gray-900 w-100% h-40 mt-7 mx-5 rounded-2xl border border-gray-700 flex justify-between'>
        <div className='grid grid-cols-2 gap-4'>
        <div className='bg-gray-800 w-75 h-26 mt-7 ml-6 rounded-2xl text-gray-300 p-5 flex flex-col font-sans font-medium text-sm'> Total Cars <p className='font-sans font-bold text-lg mt-2'>{cars.length}</p></div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 text-xl ml-[-70px] mt-[70px] bg-orange-900/60 w-8 h-8 p-1 rounded-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M499.99 176h-59.87l-16.64-41.6C406.38 91.63 365.57 64 319.5 64h-127c-46.06 0-86.88 27.63-103.99 70.4L71.87 176H12.01C4.2 176-1.53 183.34.37 190.91l6 24C7.7 220.25 12.5 224 18.01 224h20.07C24.65 235.73 16 252.78 16 272v48c0 16.12 6.16 30.67 16 41.93V416c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-54.07c9.84-11.25 16-25.8 16-41.93v-48c0-19.22-8.65-36.27-22.07-48H494c5.51 0 10.31-3.75 11.64-9.09l6-24c1.89-7.57-3.84-14.91-11.65-14.91zm-352.06-17.83c7.29-18.22 24.94-30.17 44.57-30.17h127c19.63 0 37.28 11.95 44.57 30.17L384 208H128l19.93-49.83zM96 319.8c-19.2 0-32-12.76-32-31.9S76.8 256 96 256s48 28.71 48 47.85-28.8 15.95-48 15.95zm320 0c-19.2 0-48 3.19-48-15.95S396.8 256 416 256s32 12.76 32 31.9-12.8 31.9-32 31.9z"></path></svg></div>
        
        <div className='bg-gray-800 w-75 h-26 mt-7 mr-6 rounded-2xl p-3 flex flex-col pt-5 text-gray-300'>
          <label htmlFor="category ">Filter by Category</label>
          <select
            id="category"
            className='h-10 rounded-lg border border-gray-600'
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
          
          </div>
          <div className='text-gray-200'>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  {cars.map(car => (
    <li key={car.id} className="bg-gray-950 border border-orange-500 rounded-lg p-6 flex flex-col justify-between shadow-lg relative">
      {editCarId === car.id ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4 text-amber-50">
            <input name="name" value={editForm.name} onChange={handleInputChange} placeholder="Name" className="rounded text-white w-10 p-2" />
            <input name="price" type="number" value={editForm.price} onChange={handleInputChange} placeholder="Price" className="rounded text-white w-full p-2" />
            <input name="type" value={editForm.type} onChange={handleInputChange} placeholder="Type" className="rounded text-white w-full p-2" />
            
          </div>
          <div>
            <button onClick={handleSaveClick} className="bg-green-600 px-4 py-1 rounded mr-2 text-white">Save</button>
            <button onClick={handleCancelClick} className="bg-red-600 px-4 py-1 rounded text-white">Cancel</button>
          </div>
        </>
      ) : (
        <>
          {/* Car Image */}
          <img src={car.image} alt={car.name}
            className="w-full h-52 object-cover rounded-md mb-4" />
          
          {/* Car Name */}
          <h3 className="text-xl font-bold text-white mb-1 justify-between flex">{car.name} <span className="ml-2 text-green-500 font-bold">${car.price}</span></h3>
          
          {/* Car Details */}
          <p className="text-gray-300 mb-1">{car.type}</p>
          
          {/* Add more info if needed (e.g., seats, transmission) */}
          <p className='text-gray-300 mb-1 flex ml-8'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="text-orange-400 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>{car.seats} <span className='ml-24 flex'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="text-orange-400 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>{car.mileage}</span></p>
          <p className='text-gray-300 mb-1 flex ml-8'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M336 448H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm157.2-340.7l-81-81c-6.2-6.2-16.4-6.2-22.6 0l-11.3 11.3c-6.2 6.2-6.2 16.4 0 22.6L416 97.9V160c0 28.1 20.9 51.3 48 55.2V376c0 13.2-10.8 24-24 24s-24-10.8-24-24v-32c0-48.6-39.4-88-88-88h-8V64c0-35.3-28.7-64-64-64H96C60.7 0 32 28.7 32 64v352h288V304h8c22.1 0 40 17.9 40 40v27.8c0 37.7 27 72 64.5 75.9 43 4.3 79.5-29.5 79.5-71.7V152.6c0-17-6.8-33.3-18.8-45.3zM256 192H96V64h160v128z"></path></svg>{car.fuel} <span className='ml-11 flex'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-orange-400 mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>{car.transmission}</span></p>
          {/* <p className="text-gray-400 mb-1">{car.seats} seats, {car.transmission}</p> */}
          
          {/* Action Buttons */}
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center mt-4">
                        <button
            
              onClick={() => handleEditClick(car)}
              className="flex items-center text-orange-400 hover:underline"
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>  
              Edit
            </button>
            <button
              onClick={() => handleDeleteClick(car.id)}
              className="flex items-center text-red-400 hover:underline"
            >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>
              Delete
            </button>
          </div>
          
          {/* Optional "Available" badge */}
          <span className="absolute top-4 right-4 bg-green-900 text-green-400 px-4 py-1 rounded-full text-sm font-semibold">
            Available
          </span>
        </>
      )}
    </li>
  ))}
</ul>

          </div>
        
      
    </div>
  );
};

export default AdminCars;
