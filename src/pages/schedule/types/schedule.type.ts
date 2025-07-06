export interface AiringScheduleNode {
  airingAt: number;
  episode: number;
}

export interface AiringAnime {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    large: string;
  };
  averageScore?: number;
  genres: string[];
  description?: string;
  bannerImage?: string;
  status: string;
  episodes?: number;
  format: string;
  airingSchedule: {
    nodes: AiringScheduleNode[];
  };
}

export interface AiringAnimeResponse {
  Page: {
    media: AiringAnime[];
  };
}

export interface AiringAnimeVariables {
  page: number;
  perPage: number;
  isAdult?: boolean;
}
