import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/pages/Home";
import Category from "./pages/pages/Category";
import Product from "./pages/pages/Product";
import History from "./pages/pages/History";
// import Login from "./components/Login/login";
import SignUp from "./components/Login/signUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  // {
  //   path: "/signup",
  //   element: <SignUp />,
  // },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/category",
    element: <Category />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/history",
    element: <History />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

