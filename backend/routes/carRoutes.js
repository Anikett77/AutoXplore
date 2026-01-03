import express from 'express';
import Car from '../models/Car.js';
//that we want in this
const router = express.Router();

router.get('/cars', async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.post('/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
