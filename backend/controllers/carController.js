import Car from '../models/Car.js';

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('userId', 'name email');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('userId', 'name email');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create car (Admin only)
export const createCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;

    const car = new Car({
      title,
      description,
      tags,
      images,
      userId: req.user._id
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update car (Admin only)
export const updateCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { title, description, tags, images },
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete car (Admin only)
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search cars
export const searchCars = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const cars = await Car.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { 'tags.car_type': { $regex: keyword, $options: 'i' } },
        { 'tags.company': { $regex: keyword, $options: 'i' } },
        { 'tags.dealer': { $regex: keyword, $options: 'i' } }
      ]
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
