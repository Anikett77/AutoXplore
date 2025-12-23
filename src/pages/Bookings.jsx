import React, { useEffect, useState } from "react";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Normalize user object (handle both id and _id)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedUser = storedUser
    ? { ...storedUser, _id: storedUser._id || storedUser.id }
    : null;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!loggedUser || !loggedUser._id) {
          console.warn("⚠️ No logged user found!");
          setLoading(false);
          return;
        }

        console.log("✅ Logged user ID:", loggedUser._id);

        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${loggedUser._id}`
        );

        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          console.warn("⚠️ No bookings found for this user");
          setBookings([]);
        }
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [loggedUser]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading bookings...</p>;

  if (!loggedUser)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Please login to view your bookings.
      </div>
    );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            className="border border-gray-200 p-4 rounded-lg mb-3 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {b.car?.name || "Unknown Car"}
            </h3>
            <p className="text-gray-600">
              Pickup: {new Date(b.pickupDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Return: {new Date(b.returnDate).toLocaleDateString()}
            </p>
            <p
              className={`font-semibold ${
                b.status === "pending"
                  ? "text-yellow-600"
                  : b.status === "active"
                  ? "text-green-600"
                  : "text-gray-600"
              }`}
            >
              Status: {b.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Bookings;
