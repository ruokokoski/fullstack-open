import { gql } from '@apollo/client';

export const USER_SIGN_IN = gql`
  mutation mutate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Review(
    $owner: String!
    $repo: String!
    $rating: Int!
    $review: String
  ) {
    createReview(
      review: {
        ownerName: $owner
        repositoryName: $repo
        rating: $rating
        text: $review
      }
    ) {
      repositoryId
    }
  }
`;

export const USER_SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const DEL_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;