import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../layouts/Layout";
import TrendingPage from "../pages/trending";
import AnimationsPage from "../pages/animations";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
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
