import { gql } from "@apollo/client";

export const FRAGMENT_MEDIA = gql`
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
