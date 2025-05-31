import { TrendingUp } from "@mui/icons-material";
import { ReactNode } from "react";

interface NavigationItem {
  kind?: "header";
  title: string;
  segment?: string;
  icon?: ReactNode;
}

type Navigation = NavigationItem[];

export const navigation: Navigation = [
  {
    kind: "header",
    title: "Anilist",
  },
  {
    segment: "trending",
    title: "트렌드",
    icon: <TrendingUp />,
  },
];
