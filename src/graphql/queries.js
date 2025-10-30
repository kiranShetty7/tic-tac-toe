import { gql } from "@apollo/client";

export const GET_USERS_BY_EMAIL = gql`
  query getUsers($email: String!, $userId: ID!) {
    getUsers(email: $email, userId: $userId) {
      success
      data {
        _id
        name
        email
      }
    }
  }
`;

export const GET_SENT_INVITES = gql`
  query getSentInvites($userId: ID!) {
    getSentInvites(userId: $userId) {
      success
      message
      invites {
        _id
        from
        to {
          _id
          name
          email
        }
        gameId
      }
    }
  }
`;

export const GET_RECEIVED_INVITES = gql`
  query GetReceivedInvites($userId: ID!) {
    getReceivedInvites(userId: $userId) {
      success
      message
      invites {
        _id
        from {
          _id
          name
          email
        }
        to
        gameId
      }
    }
  }
`;
