import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA } from "./fragments";

export const PAGE = gql`
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(search: $search) {
        ...media
      }
    }
  }
  ${FRAGMENT_MEDIA}
`;

export const TREND = gql`
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

export const MEDIA = gql`
  query ($id: Int) {
    Media(id: $id) {
      ...media
    }
  }
  ${FRAGMENT_MEDIA}
`;

export const GENRES = gql`
  query {
    genres: GenreCollection
    tags: MediaTagCollection {
      name
      description
      category
      isAdult
    }
  }
`;
