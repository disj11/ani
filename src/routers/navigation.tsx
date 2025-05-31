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
    title: "둘러보기",
  },
  {
    segment: "trending",
    title: "트렌딩",
    icon: <TrendingUp />,
  },
  {
    segment: "search",
    title: "고급 검색",
    icon: <Search />,
  },
  {
    segment: "popular",
    title: "인기 순위",
    icon: <Whatshot />,
  },
  {
    segment: "new-releases",
    title: "신작",
    icon: <NewReleases />,
  },
  {
    kind: "divider",
    title: "",
  },
  {
    kind: "header",
    title: "카테고리",
  },
  {
    segment: "genre",
    title: "장르별",
    icon: <Category />,
  },
  {
    segment: "year",
    title: "연도별",
    icon: <DateRange />,
  },
  {
    segment: "status",
    title: "상태별",
    icon: <PlayArrow />,
    children: [
      {
        segment: "status/airing",
        title: "방영중",
        icon: <PlayArrow />,
      },
      {
        segment: "status/finished",
        title: "완결",
        icon: <CheckCircle />,
      },
      {
        segment: "status/upcoming",
        title: "방영 예정",
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
    title: "랭킹",
  },
  {
    segment: "top-rated",
    title: "높은 평점",
    icon: <Star />,
  },
  {
    segment: "animations",
    title: "전체 목록",
    icon: <Category />,
  },
];
