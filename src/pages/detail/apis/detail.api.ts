import { gql, useQuery } from "@apollo/client";

const GET_MEDIA_DETAIL = gql`
  query GetMediaDetail($id: Int!) {
    Media(id: $id) {
      id
      title {
        userPreferred
        english
        native
      }
      description
      coverImage {
        large
        extraLarge
      }
      bannerImage
      averageScore
      meanScore
      popularity
      favourites
      episodes
      duration
      status
      format
      genres
      tags {
        id
        name
        description
      }
      studios {
        nodes {
          id
          name
        }
      }
      staff {
        nodes {
          id
          name {
            userPreferred
          }
          image {
            medium
          }
        }
      }
      characters {
        nodes {
          id
          name {
            userPreferred
          }
          image {
            medium
          }
        }
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      source
      trailer {
        id
        site
        thumbnail
      }
      externalLinks {
        id
        url
        site
      }
      relations {
        nodes {
          id
          title {
            userPreferred
          }
          coverImage {
            medium
          }
          format
          status
        }
      }
      recommendations {
        nodes {
          mediaRecommendation {
            id
            title {
              userPreferred
            }
            coverImage {
              medium
            }
            averageScore
          }
        }
      }
    }
  }
`;

export const useMediaDetailQuery = (id: number) => {
  return useQuery(GET_MEDIA_DETAIL, {
    variables: { id },
    skip: !id,
  });
};