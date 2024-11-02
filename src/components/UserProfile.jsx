import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

//Import รูปเข้ามา


const UserProfile = () => {
  const { logout } = useAuthContext(); // ดึงฟังก์ชัน logout จาก context
  const navigate = useNavigate(); // ใช้ navigate เพื่อเปลี่ยนเส้นทาง

  const handleLogout = () => {
    logout(); // เรียกใช้ฟังก์ชัน logout
    navigate("/login"); // ใช้ navigate เพื่อเปลี่ยนเส้นทางไปที่หน้า Login
  };

  return (
    <div className="relative">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar border border-gray-300 rounded-full p-1 relative"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="User Avatar"
              src="https://cdn-icons-png.flaticon.com/256/17588/17588305.png"
            />
          </div>
          {/* Green Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-white border border-gray-200 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
        >
          <li>
            <Link
              to="/userprofile"
              className="flex items-center justify-between text-[#007BFF] hover:bg-[#F0F4FF] px-4 py-2 rounded-md"
            >
              Profile
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946083.png"
                alt="Profiles Icon"
                className="w-5 h-5"
              />
            </Link>
          </li>

          <li>
            <a
              className="text-[#FF4D4D] hover:bg-[#FFECEC] px-4 py-2 rounded-md"
              onClick={handleLogout}
            >
              Logout
              <img
                src="https://cdn-icons-png.flaticon.com/512/1574/1574351.png"
                alt="Logout Icon"
                className="w-5 h-5"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;