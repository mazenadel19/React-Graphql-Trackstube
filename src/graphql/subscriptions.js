import { gql } from "@apollo/client";

export const GET_SONGS_SUBSCRIPTION = gql`
  subscription GetSongs {
    songs(order_by: {created_at: desc})  {
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`;