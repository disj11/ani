import { useQuery, gql } from "@apollo/client";
import {
  AiringAnimeResponse,
  AiringAnimeVariables,
} from "../types/schedule.type";

const GET_AIRING_ANIME = gql`
  query GetAiringAnime($page: Int, $perPage: Int, $isAdult: Boolean = false) {
    Page(page: $page, perPage: $perPage) {
      media(
        type: ANIME
        status: RELEASING
        sort: [POPULARITY_DESC]
        isAdult: $isAdult
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
        airingSchedule(notYetAired: false, perPage: 1) {
          nodes {
            airingAt
            episode
          }
        }
      }
    }
  }
`;

export const useAiringAnimeScheduleQuery = (
  variables: AiringAnimeVariables,
) => {
  return useQuery<AiringAnimeResponse>(GET_AIRING_ANIME, {
    variables,
    fetchPolicy: "cache-first",
  });
};
