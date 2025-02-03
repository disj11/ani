import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../layouts/Layout";
import TrendingPage from "../pages/trending";
import AnimationsPage from "../pages/animations";
import { Navigate } from "react-router";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            element: <Navigate to="/trending" />,
          },
          {
            path: "/trending",
            Component: TrendingPage,
          },
          {
            path: "/animations",
            Component: AnimationsPage,
          },
        ],
      },
    ],
  },
]);

export default router;
