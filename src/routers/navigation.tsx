import {
  TrendingUp,
  Search,
  Schedule,
  NewReleases,
  Whatshot,
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
    segment: "popular",
    title: "Popular",
    icon: <Whatshot />,
  },
  {
    segment: "new-releases",
    title: "New Releases",
    icon: <NewReleases />,
  },
  {
    segment: "schedule",
    title: "Schedule",
    icon: <Schedule />,
  },
  {
    kind: "divider",
    title: "",
  },
  {
    kind: "header",
    title: "Browse",
  },
  {
    segment: "search",
    title: "Advanced Search",
    icon: <Search />,
  },
];
