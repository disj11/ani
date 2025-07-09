import { useQuery, gql } from "@apollo/client";
import {
  SearchAnimeResponse,
  SearchAnimeVariables,
} from "../types/search.types";

const SEARCH_ANIME = gql`
  query SearchAnime(
    $search: String
    $genre: [String]
    $year: Int
    $status: MediaStatus
    $format: MediaFormat
    $sort: [MediaSort]
    $page: Int
    $perPage: Int
    $scoreGreater: Int
    $episodeGreater: Int
    $episodeLesser: Int
    $isAdult: Boolean = false
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        search: $search
        genre_in: $genre
        seasonYear: $year
        status: $status
        format: $format
        sort: $sort
        type: ANIME
        isAdult: $isAdult
        averageScore_greater: $scoreGreater
        episodes_greater: $episodeGreater
        episodes_lesser: $episodeLesser
      ) {
        id
        title {
          userPreferred
        }
        coverImage {
          large
        }
        averageScore
        genres
        description
        bannerImage
        status
        episodes
        format
      }
    }
  }
`;

export const useSearchAnimeQuery = (variables: SearchAnimeVariables) => {
  return useQuery<SearchAnimeResponse>(SEARCH_ANIME, {
    variables,
    fetchPolicy: "cache-first",
  });
};
