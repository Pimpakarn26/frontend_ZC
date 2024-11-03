import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"; // Import AuthContext
import Swal from "sweetalert2";
import AuthService from "../services/Store.services"; // Adjust according to your API service
// import axios from "axios"; // Import axios
// const GEO_KEY = import.meta.env.VITE_GEOAPIMAP_KEY;

const Add = () => {
  const { currentUser } = useAuthContext(); // Get current user from AuthContext
  const navigate = useNavigate();

  const [store, setStore] = useState({
    userId: "", // Assuming you have userId to associate with the store
    storeName: "",
    address: "",
    lat: "",
    lng: "",
    radius: "",
  });

  // Check if user is logged in
  useEffect(() => {
    if (!currentUser) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'Please log in to add a store.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate("/login");
      });
    } else {
      setStore((prev) => ({ ...prev, userId: currentUser.id })); // Set userId from currentUser if available
    }
  }, [currentUser, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await AuthService.createStore(store); // Use your API service for store creation
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Store Added",
          text: "Your store has been added successfully!",
          icon: "success",
        });
        navigate("/Home"); // Navigate to the home page
      }
    } catch (error) {
      console.log("Error:", error); // Check for errors
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Error adding store",
        icon: "error",
      });
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setStore((prevStore) => ({
          ...prevStore,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
        Swal.fire("Success", "Current location retrieved!", "success");
      }, (error) => {
        console.error("Error getting location:", error);
        Swal.fire("Error", "Could not get current location.", "error");
      });
    } else {
      Swal.fire("Error", "Geolocation is not supported by this browser.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#E8F7E9] to-[#C2EBC3]">
      <div className="card bg-white shadow-xl rounded-lg w-full max-w-md p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Add Store
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-semibold">
            Store Name
            <input
              type="text"
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
              placeholder="Enter store name"
              name="storeName"
              value={store.storeName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block text-gray-700 font-semibold">
            Address
            <input
              type="text"
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
              placeholder="Enter address"
              name="address"
              value={store.address}
              onChange={handleChange}
              required
            />
          </label>

          <label className="block text-gray-700 font-semibold">
            Latitude
            <input
              type="number"
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
              placeholder="Enter latitude"
              name="lat"
              value={store.lat}
              readOnly // Not editable by user
            />
          </label>

          <label className="block text-gray-700 font-semibold">
            Longitude
            <input
              type="number"
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
              placeholder="Enter longitude"
              name="lng"
              value={store.lng}
              readOnly // Not editable by user
            />
          </label>

          <label className="block text-gray-700 font-semibold">
            Delivery Radius (in km)
            <input
              type="number"
              className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-[#F0FAF2] focus:outline-none focus:ring-2 focus:ring-[#86D293]"
              placeholder="Enter delivery radius"
              name="deliveryRadius"
              value={store.deliveryRadius}
              onChange={handleChange}
              required
            />
          </label>

          <div className="text-center space-x-4 mt-6">
            <button
              type="submit"
              className="btn bg-[#86D293] text-white px-4 py-2 rounded-md hover:bg-[#79B783] transition"
            >
              Add Store
            </button>
            <button
              type="button"
              className="btn bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              onClick={() => navigate("/Home")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={handleGetCurrentLocation}
            >
              Get Current Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
