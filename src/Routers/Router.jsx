import { createBrowserRouter } from "react-router-dom";
// const Login = lazy(() => import("../pages/Login"));
// const Home = lazy(() => import("../pages/Home"));
// const Register = lazy(() => import("./../pages/Register"));
import Login from "../pages/Login";
import Home from "../pages/Home";
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import Layout from "../components/Layout";
import Register from '../pages/Register';
import UserProfile from "../pages/UserProfile";
import AdminPage from "../pages/AdminPage";
import NotAllowed from "../pages/NotAllowed";
import UsePage from "../pages/UserPage";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
    {
      path: "/home",
      element: (
        <UsePage>
          <Home />
        </UsePage>
      ),
    },
    {
      path: "add",
      element: (
        <AdminPage>
            {" "}
            <Add />{" "}
          </AdminPage>
      ),
    },
    { path: "edit/:id",
    element: (
        <AdminPage>
            <Edit />
        </AdminPage>
      ),
    },
    {
      path: "login", 
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    // {
    //   path: "/edit/:storeId",
    //   element: (
    //     <PrivateRoute allowedRoles={["admin"]} userRole={userRole}>
    //       <Edit />
    //     </PrivateRoute>
    //   ),
    // },
    {
        path: "/notAllowed",
        element: <NotAllowed />,
      },
    {
        path: "/UserProfile",
        element: <UserProfile />,
      },
     
    ]
    }
]);
  
export default router;
  

// const router = createBrowserRouter([
//     {
//         children: [
//         {
//             path: "/Home",
//             element: (
//               <UsePage>
//                 <Home />
//               </UsePage>
//             ),
//           },
//           {
//             path: "login",
//             element: <Login />,
//           },
//           {
//             path: "register",
//             element: (
//               <ProtectRegister>
//                 {" "}
//                 <Register />{" "}
//               </ProtectRegister>
//             ),
//           },
//         ],
//     },
// ]);