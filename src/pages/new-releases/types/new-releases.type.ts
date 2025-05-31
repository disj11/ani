export interface NewReleasesVariables {
  page: number;
  perPage: number;
  season?: string;
  seasonYear: number;
  isAdult?: boolean;
}

export interface NewReleasesResponse {
  Page: {
    pageInfo: {
      total: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
      perPage: number;
    };
    media: Media[];
  };
}

export interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
  averageScore?: number;
  genres: string[];
  description?: string;
  bannerImage?: string;
  status: string;
  episodes?: number;
  format: string;
  startDate?: StartDate;
}

interface Title {
  userPreferred: string;
}

interface CoverImage {
  large: string;
}

interface StartDate {
  year: number;
  month: number;
  day: number;
}