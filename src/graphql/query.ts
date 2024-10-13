import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query characters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
        species
        type
        gender
      }
    }
  }
`;
