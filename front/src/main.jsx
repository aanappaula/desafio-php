import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./components/pages/Home";
import Category from "./components/pages/Category";
import Product from "./components/pages/Product";
import History from "./components/pages/History";
import Detail from "./components/pages/Detail";

const router = createBrowserRouter([
  {
    path: "/",
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
  {
    path: "/detail",
    element: <Detail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

