export interface MediaDetail {
  id: number;
  title: {
    userPreferred: string;
    english?: string;
    native?: string;
  };
  description?: string;
  coverImage: {
    large: string;
    extraLarge?: string;
  };
  bannerImage?: string;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  favourites?: number;
  episodes?: number;
  duration?: number;
  status: string;
  format: string;
  genres: string[];
  tags: Tag[];
  studios: {
    nodes: Studio[];
  };
  staff: {
    nodes: Staff[];
  };
  characters: {
    nodes: Character[];
  };
  startDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  endDate: {
    year?: number;
    month?: number;
    day?: number;
  };
  season?: string;
  seasonYear?: number;
  source?: string;
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  };
  externalLinks: ExternalLink[];
  relations: {
    nodes: RelatedMedia[];
  };
  recommendations: {
    nodes: Recommendation[];
  };
}

interface Tag {
  id: number;
  name: string;
  description?: string;
}

interface Studio {
  id: number;
  name: string;
}

interface Staff {
  id: number;
  name: {
    userPreferred: string;
  };
  image?: {
    medium: string;
  };
}

interface Character {
  id: number;
  name: {
    userPreferred: string;
  };
  image?: {
    medium: string;
  };
}

interface ExternalLink {
  id: number;
  url: string;
  site: string;
}

interface RelatedMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    medium: string;
  };
  format: string;
  status: string;
}

interface Recommendation {
  mediaRecommendation: {
    id: number;
    title: {
      userPreferred: string;
    };
    coverImage: {
      medium: string;
    };
    averageScore?: number;
  };
}

export interface MediaDetailResponse {
  Media: MediaDetail;
}