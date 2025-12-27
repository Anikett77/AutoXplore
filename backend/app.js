import express from 'express';
import mongoose from 'mongoose';
import carsRouter from './routes/carRoutes.js';

const app = express();
app.use(express.json());
app.use('/', carsRouter); // routes '/' ke andar mount ho rahe hain ok

mongoose.connect('mongodb://localhost:27017/Autoxplore-cluster')
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
app.post('/test', (req, res) => {
  res.json({ message: "POST request received", data: req.body });
});

