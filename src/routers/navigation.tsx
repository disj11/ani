import { ListAlt, TrendingUp } from "@mui/icons-material";
import type { Navigation } from "@toolpad/core";

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
  {
    segment: "animations",
    title: "목록",
    icon: <ListAlt />,
  },
];
