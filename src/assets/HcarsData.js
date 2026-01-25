// src/data/carsData.js
import HC1 from "../assets/HC1.png";
import HC2 from "../assets/HC2.png";
import HC3 from "../assets/HC3.png";
import HC4 from "../assets/HC4.png";
import HC5 from "../assets/HC5.png";
import HC6 from "../assets/HC6.png";
import HC7 from "../assets/HC7.png";
import HC8 from "../assets/HC8.png";

const carsData = [
  {
    id: 1,
    name: "Toyota Corolla",
    type: "Compact Sedan",
    price: 3000,
    image: HC1,
    about: "Reliable, fuel-efficient commuter.",
    seats: 5,
    fuel: "Gasoline",
    mileage: "30 MPG",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 2,
    name: "Honda Civic",
    type: "Compact Sedan",
    price: 2500,
    image: HC2,
    about: "Sporty handling with modern tech.",
    seats: 5,
    fuel: "Gasoline",
    mileage: "32 MPG",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 3,
    name: "Volkswagen Golf",
    type: "Hatchback",
    price: 5000,
    image: HC3,
    about: "Practical hatch with punchy engine.",
    seats: 5,
    fuel: "Gasoline",
    mileage: "29 MPG",
    transmission: "Manual",
    status: "available"
  },
  {
    id: 4,
    name: "Hyundai Elantra",
    type: "Compact Sedan",
    price: 2000,
    image: HC4,
    about: "Smooth ride, lots of tech features.",
    seats: 5,
    fuel: "Gasoline",
    mileage: "33 MPG",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 5,
    name: "Nissan Altima",
    type: "Midsize Sedan",
    price: 7000,
    image: HC5,
    about: "Comfortable and spacious daily driver.",
    seats: 5,
    fuel: "Gasoline",
    mileage: "31 MPG",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 6,
    name: "Chevrolet Cruze",
    type: "Compact Sedan",
    price: 10000,
    image: HC6,
    about: "Efficient cruiser with solid handling.",
    seats: 5,
    fuel: "Diesel",
    mileage: "34 MPG",
    transmission: "Manual",
    status: "available"
  },
  {
    id: 7,
    name: "Mercedes-AMG GT",
    type: "Concept Car",
    price: 10000,
    image: HC7,
    about: "Supercar-level performance with iconic design.",
    seats: 2,
    fuel: "Petrol",
    mileage: "10 MPG",
    transmission: "Automatic",
    status: "available"
  },
  {
    id: 8,
    name: "Dodge Challenger",
    type: "Muscle Car",
    price: 10000,
    image: HC8,
    about: "Powerful car with highest torque.",
    seats: 5,
    fuel: "Petrol",
    mileage: "25 MPG",
    transmission: "Manual",
    status: "available"
  }
];

export default carsData;
