export enum Season {
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  FALL = "FALL",
  WINTER = "WINTER",
}

export interface TrendSearchParams {
  season: Season;
  seasonYear: number;
  nextSeason: Season;
  nextYear: number;
}

export interface TrendResponse {
  trending: { media: Array<Media> };
  season: { media: Array<Media> };
  nextSeason: { media: Array<Media> };
  popular: { media: Array<Media> };
  top: { media: Array<Media> };
}

export interface Media {
  averageScore?: number;
  coverImage: CoverImage;
  genres: Array<string>;
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
