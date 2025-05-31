import { useQuery } from "@apollo/client";
import { TrendingResponse, TrendingSearchParams } from "../types/trending.type";
import { gql } from "@apollo/client";

const FRAGMENT_MEDIA = gql`
  fragment media on Media {
    id
    title {
      userPreferred
    }
    genres
    averageScore
    coverImage {
      large
    }
    bannerImage
    description(asHtml: false)
    status
    episodes
    format
  }
`;

const TREND = gql`
  query (
    $season: MediaSeason
    $seasonYear: Int
    $nextSeason: MediaSeason
    $nextYear: Int
  ) {
    trending: Page(page: 1, perPage: 6) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: 6) {
      media(
        season: $season
        seasonYear: $seasonYear
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: 6) {
      media(
        season: $nextSeason
        seasonYear: $nextYear
        sort: POPULARITY_DESC
        type: ANIME
        isAdult: false
      ) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 6) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: 10) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }
  ${FRAGMENT_MEDIA}
`;

export const useTrendingQuery = (searchParams: TrendingSearchParams) => {
  return useQuery<TrendingResponse>(TREND, {
    variables: searchParams,
  });
};
