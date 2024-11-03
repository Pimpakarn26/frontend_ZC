import { Outlet } from "react-router-dom";
// import { AuthProvider } from "../contexts/AuthContext";
import Footer from "./Footer";
// import Navbar from "./Navbar"; // แก้ไขจาก Nvabar เป็น Navbar


const Layout = () => {
  return (
    <>
      {/* <Navbar /> */}
<div className="bg-gradient-to-r from-[#0288d1
] to-[#0288d1
]  shadow-lg min-h-screen flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer className="flex-shrink-0" /> 
      </div>
    </>
  );
};

export default Layout;