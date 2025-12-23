import I1 from "../assets/I1.jpg";
import I2 from "../assets/I2.jpg";
import I3 from "../assets/I3.jpg";
import I4 from "../assets/I4.jpg";
import I5 from "../assets/I5.jpg";
import I6 from "../assets/I6.jpg";
import I7 from "../assets/I7.jpg";
import I8 from "../assets/I8.jpg";
import I9 from "../assets/I9.jpg";
import I10 from "../assets/I10.jpg";
import I11 from "../assets/I11.jpg";
import I12 from "../assets/I12.jpg";
import I13 from "../assets/I13.jpg";
import I14 from "../assets/I14.jpg";
import I15 from "../assets/I15.jpg";
import I16 from "../assets/I16.jpg";
import I17 from "../assets/I17.jpg";
import I18 from "../assets/I18.jpg";
import I19 from "../assets/I19.jpg";

const carsData = [
  {
    id: 1,
    name: "Mahindra XUV700",
    type: "SUV",
    price: 4500,
    image: I1,
    about: "Premium SUV with advanced ADAS and panoramic sunroof.",
    seats: 7,
    fuel: "Diesel",
    mileage: "15 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 2,
    name: "Mahindra Scorpio N",
    type: "SUV",
    price: 4000,
    image: I2,
    about: "Strong and stylish SUV built for power and performance.",
    seats: 7,
    fuel: "Diesel",
    mileage: "14 km/l",
    transmission: "Manual",
    status: "available"
  },
  {
    id: 3,
    name: "Mahindra Scorpio Classic",
    type: "SUV",
    price: 3500,
    image: I3,
    about: "Iconic design with rugged body and reliable engine.",
    seats: 7,
    fuel: "Diesel",
    mileage: "14 km/l",
    transmission: "Manual",
    status: "available"
  },
  {
    id: 4,
    name: "Mahindra Thar",
    type: "Off-Roader",
    price: 5000,
    image: I4,
    about: "Off-road beast with convertible top and 4x4 drive.",
    seats: 4,
    fuel: "Diesel",
    mileage: "12 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 5,
    name: "Mahindra BE.6e",
    type: "Electric SUV",
    price: 5500,
    image: I5,
    about: "Next-gen electric SUV with futuristic design and range.",
    seats: 5,
    fuel: "Electric",
    mileage: "450 km range",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 6,
    name: "Tata Safari",
    type: "SUV",
    price: 4200,
    image: I6,
    about: "Luxury and comfort merged with Tata’s power and design.",
    seats: 7,
    fuel: "Diesel",
    mileage: "16 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 7,
    name: "Tata Harrier",
    type: "SUV",
    price: 4000,
    image: I7,
    about: "Bold design and top-tier safety features from Tata.",
    seats: 5,
    fuel: "Diesel",
    mileage: "17 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 8,
    name: "Toyota Fortuner",
    type: "SUV",
    price: 5500,
    image: I8,
    about: "Ultimate power SUV with off-road dominance.",
    seats: 7,
    fuel: "Diesel",
    mileage: "13 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 9,
    name: "Volkswagen Virtus",
    type: "Sedan",
    price: 3200,
    image: I9,
    about: "Elegant German sedan with turbo performance.",
    seats: 5,
    fuel: "Petrol",
    mileage: "18 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 10,
    name: "Škoda Slavia",
    type: "Sedan",
    price: 3100,
    image: I10,
    about: "Premium build quality and powerful turbo engine.",
    seats: 5,
    fuel: "Petrol",
    mileage: "18 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 11,
    name: "Škoda Octavia",
    type: "Luxury Sedan",
    price: 4000,
    image: I11,
    about: "Refined design and smooth DSG experience.",
    seats: 5,
    fuel: "Petrol",
    mileage: "16 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 12,
    name: "Kia K4",
    type: "Sedan",
    price: 3300,
    image: I12,
    about: "Stylish, compact, and tech-loaded modern sedan.",
    seats: 5,
    fuel: "Petrol",
    mileage: "17 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 13,
    name: "Kia Seltos",
    type: "SUV",
    price: 3700,
    image: I13,
    about: "Compact SUV with great looks and performance.",
    seats: 5,
    fuel: "Petrol",
    mileage: "18 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 14,
    name: "Kia Sonet",
    type: "Compact SUV",
    price: 3400,
    image: I14,
    about: "Urban-friendly SUV with premium interiors.",
    seats: 5,
    fuel: "Petrol",
    mileage: "19 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 15,
    name: "Ford Raptor",
    type: "Pickup Truck",
    price: 6000,
    image: I15,
    about: "Powerful pickup truck built for rugged terrains.",
    seats: 5,
    fuel: "Diesel",
    mileage: "10 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 16,
    name: "Ford Everest",
    type: "SUV",
    price: 5200,
    image: I16,
    about: "Adventure SUV with off-road capability and comfort.",
    seats: 7,
    fuel: "Diesel",
    mileage: "12 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 17,
    name: "Jeep Wrangler",
    type: "Off-Roader",
    price: 6500,
    image: I17,
    about: "Iconic 4x4 legend with unmatched off-road capabilities.",
    seats: 4,
    fuel: "Petrol",
    mileage: "10 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 18,
    name: "Jeep Compass",
    type: "SUV",
    price: 4200,
    image: I18,
    about: "Stylish compact SUV with robust build and luxury interior.",
    seats: 5,
    fuel: "Diesel",
    mileage: "15 km/l",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 19,
    name: "Toyota Land Cruiser",
    type: "Off-Road SUV",
    price: 11000,
    image: I19,
    about: "Unstoppable off-road capability with premium comfort.",
    seats: 7,
    fuel: "Diesel",
    mileage: "10 km/l",
    transmission: "Automatic",
    status: "available"
  }
];

export default carsData;
