export interface PopularAnimeResponse {
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
}

interface Title {
  userPreferred: string;
}

interface CoverImage {
  large: string;
}