import { 
  TrendingUp, 
  Search, 
  Category, 
  DateRange, 
  Star, 
  PlayArrow, 
  CheckCircle, 
  Schedule,
  NewReleases,
  Whatshot
} from "@mui/icons-material";
import { ReactNode } from "react";

interface NavigationItem {
  kind?: "header" | "divider";
  title: string;
  segment?: string;
  icon?: ReactNode;
  children?: NavigationItem[];
}

type Navigation = NavigationItem[];

export const navigation: Navigation = [
  {
    kind: "header",
    title: "Explore",
  },
  {
    segment: "trending",
    title: "Trending",
    icon: <TrendingUp />,
  },
  {
    segment: "search",
    title: "Advanced Search",
    icon: <Search />,
  },
  {
    segment: "popular",
    title: "Popular Rankings",
    icon: <Whatshot />,
  },
  {
    segment: "new-releases",
    title: "New Releases",
    icon: <NewReleases />,
  },
  {
    kind: "divider",
    title: "",
  },
  {
    kind: "header",
    title: "Categories",
  },
  {
    segment: "genre",
    title: "By Genre",
    icon: <Category />,
  },
  {
    segment: "year",
    title: "By Year",
    icon: <DateRange />,
  },
  {
    segment: "status",
    title: "By Status",
    icon: <PlayArrow />,
    children: [
      {
        segment: "status/airing",
        title: "Airing",
        icon: <PlayArrow />,
      },
      {
        segment: "status/finished",
        title: "Completed",
        icon: <CheckCircle />,
      },
      {
        segment: "status/upcoming",
        title: "Upcoming",
        icon: <Schedule />,
      },
    ],
  },
  {
    kind: "divider",
    title: "",
  },
  {
    kind: "header",
    title: "Rankings",
  },
  {
    segment: "top-rated",
    title: "Top Rated",
    icon: <Star />,
  },
  {
    segment: "animations",
    title: "Full List",
    icon: <Category />,
  },
];
