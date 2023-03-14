import { gql } from '@apollo/client'

export const GET_POST = gql`
query getAllPost{
  posts{
    id
    title
    sort_description
    user{
      profile_photo
    }
  }
}
`;

export const POST_SUBCRIPTION = gql`
subscription  {
  postCreated{
    id
    title
    sort_description
    user{
      profile_photo
    }
  }
}
`;



