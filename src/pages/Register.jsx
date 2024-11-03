import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // Use useNavigate
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    address: "", // Add address
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!user.username) newErrors.username = "Username is required"; 
    if (!user.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email is invalid";
    if (!user.password) newErrors.password = "Password is required";
    if (!user.address) newErrors.address = "Address is required"; // Validate address
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    // If there are validation errors, do not proceed
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    
    setErrors({});
    setLoading(true);

    try {
      console.log("User data being sent:", user);
      const response = await axios.post("http://localhost:5000/api/auth/signup", user);
      Swal.fire("Registration successful", response.data.message, "success");
      
      // Reset user data after successful registration
      setUser({
        username: "",
        email: "",
        password: "",
        address: "", // Reset address after success
      });

      // Navigate to the login page after successful registration
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      console.error("Registration error:", errorMessage);
      Swal.fire("Registration error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-300 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-primary">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.username && <p className="mt-2 text-sm text-error">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-2 text-sm text-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
            {errors.password && <p className="mt-2 text-sm text-error">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="address" className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter your address"
            />
            {errors.address && <p className="mt-2 text-sm text-error">{errors.address}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
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

export default Register;
