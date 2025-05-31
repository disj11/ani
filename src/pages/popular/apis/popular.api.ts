import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { PopularAnimeResponse } from "../types/popular.type";

const GET_POPULAR_ANIME = gql`
  query GetPopularAnime(
    $sort: [MediaSort]
    $page: Int
    $perPage: Int
    $year: Int
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
      media(sort: $sort, type: ANIME, seasonYear: $year, isAdult: $isAdult) {
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

export const usePopularAnimeQuery = (variables: {
  sort: string[];
  page: number;
  perPage: number;
  year?: number;
}) => {
  return useQuery<PopularAnimeResponse>(GET_POPULAR_ANIME, {
    variables,
    fetchPolicy: "cache-and-network",
  });
};
