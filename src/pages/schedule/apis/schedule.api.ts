import { useQuery, gql } from "@apollo/client";

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
}

const GET_AIRING_ANIME = gql`
  query GetAiringAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, status: RELEASING, sort: [POPULARITY_DESC]) {
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

export const useAiringAnimeScheduleQuery = (variables: AiringAnimeVariables) => {
  return useQuery<AiringAnimeResponse>(GET_AIRING_ANIME, {
    variables,
    fetchPolicy: "cache-and-network",
  });
};
