export interface SearchAnimeVariables {
  search?: string;
  genre?: string[];
  year?: number;
  status?: string;
  format?: string;
  sort?: string[];
  page?: number;
  perPage?: number;
  scoreGreater?: number;
  episodeGreater?: number;
  episodeLesser?: number;
  isAdult?: boolean;
}