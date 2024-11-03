import React, { useState } from "react";
import AuthService from "../services/auth.services"; // Import AuthService
import { useAuthContext } from "../contexts/AuthContext"; // Import useAuthContext
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuthContext(); // Use login from context
  const navigate = useNavigate(); // Create an instance of navigate

  const handleChange = (e) => {
    const { name, value } = e.target; // Get name and value from input
    setUser((prevUser) => ({ ...prevUser, [name]: value })); // Update user value
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      console.log("Attempting to log in with:", user);
      const response = await AuthService.login(user.username, user.password); // Call login from AuthService
      console.log(response); // Log the response
      if (response.status === 200) {
        const currentUser = response.data; // Get the user data
        login(currentUser); // Update context with logged-in user data
        console.log("Current User:", currentUser); // Log current user
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "You will be redirected to the homepage.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/home"); // Navigate to Home
        });
        setUser({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ.";
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: errorMessage,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to Home
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-300 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-primary">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text text-secondary">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="label-text text-secondary">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
