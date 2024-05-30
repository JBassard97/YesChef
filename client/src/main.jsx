import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// ! Not logged in pages
import Signup from "./pages/Signup/Signup.jsx";

// ! Logged in pages
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import Employees from "./pages/Employees/Employees.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";
import Settings from "./pages/Settings/Settings.jsx";

// ! Footer pages
import Help from "./pages/Help/Help.jsx";
import Testimonials from "./pages/Testimonials/Testimonials.jsx";
import About from "./pages/About/About.jsx";
import Developer from "./pages/Developer/Developer.jsx";
import Stats from "./pages/Stats/Stats.jsx";

import Login from "./pages/Login/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />, // ! Request Login from the start
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/developer",
        element: <Developer />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
