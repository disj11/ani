import { createBrowserRouter } from "react-router";
import App from "../App";
import Layout from "../layouts/Layout";
import TrendingPage from "../pages/trending";
import DetailPage from "../pages/detail";
import SearchPage from "../pages/search";
import PopularPage from "../pages/popular";
import NewReleasesPage from "../pages/new-releases";
import { Navigate } from "react-router";
import SchedulePage from "../pages/schedule";

const router = createBrowserRouter(
  [
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
              path: "/search",
              Component: SearchPage,
            },
            {
              path: "/popular",
              Component: PopularPage,
            },
            {
              path: "/detail/:id",
              Component: DetailPage,
            },
            {
              path: "/new-releases",
              Component: NewReleasesPage,
            },
            {
              path: "/schedule",
              Component: SchedulePage,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/ani",
  },
);

export default router;
