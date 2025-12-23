import React, { useState } from 'react';
import EditCars from './EditCars';
import CarList from './CarList';

const ManageCar = () => {
  // State for cars and edit info
  const [cars, setCars] = useState([...initialCarsData]); // Use your initial data here
  const [editCarId, setEditCarId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEditClick = (car) => {
    setEditCarId(car.id);
    setEditName(car.name);
  };

  const handleNameChange = (e) => {
    setEditName(e.target.value);
  };

  const handleSaveClick = () => {
    setCars(cars.map(car => car.id === editCarId ? { ...car, name: editName } : car));
    setEditCarId(null);
  };

  const handleCancelClick = () => {
    setEditCarId(null);
  };

  return (
    <div>
      <h1>Manage Cars</h1>
      <CarList cars={cars} onEditClick={handleEditClick} editCarId={editCarId} />
      {editCarId && (
        <EditCars
          editName={editName}
          onNameChange={handleNameChange}
          onSave={handleSaveClick}
          onCancel={handleCancelClick}
        />
      )}
      {cars.length === 0 && <p>No cars available</p>}
    </div>
  );
};

export default ManageCar;
