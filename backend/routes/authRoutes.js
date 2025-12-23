import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Register route (for creating admin users)
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;
