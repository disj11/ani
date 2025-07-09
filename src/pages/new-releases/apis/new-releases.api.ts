import { useQuery, gql } from "@apollo/client";
import {
  NewReleasesResponse,
  NewReleasesVariables,
} from "../types/new-releases.type";

const GET_NEW_RELEASES = gql`
  query GetNewReleases(
    $page: Int
    $perPage: Int
    $season: MediaSeason
    $seasonYear: Int
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
        sort: [START_DATE_DESC]
        type: ANIME
        season: $season
        seasonYear: $seasonYear
        status: RELEASING
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
        startDate {
          year
          month
          day
        }
      }
    }
  }
`;

export const useNewReleasesQuery = (variables: NewReleasesVariables) => {
  return useQuery<NewReleasesResponse>(GET_NEW_RELEASES, {
    variables,
    fetchPolicy: "cache-first",
  });
};
