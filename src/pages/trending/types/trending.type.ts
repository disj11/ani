export enum Season {
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
  WINTER = "WINTER",
}

export interface TrendingSearchParams {
  season: Season;
  seasonYear: number;
  nextSeason: Season;
  nextYear: number;
}

export interface TrendingResponse {
  trending: { media: Media[] };
  season: { media: Media[] };
  nextSeason: { media: Media[] };
  popular: { media: Media[] };
  top: { media: Media[] };
}

export interface Media {
  averageScore?: number;
  coverImage: CoverImage;
  genres: string[];
  id: number;
  title: Title;
  description?: string;
  bannerImage?: string;
  status: string;
  episodes: number;
  format: string;
}

interface CoverImage {
  large: string;
}

interface Title {
  userPreferred: string;
}
