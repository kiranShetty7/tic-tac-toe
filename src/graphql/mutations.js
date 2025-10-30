import { gql } from "@apollo/client";

export const SEND_INVITE = gql`
  mutation SendInvite($input: InviteInput!) {
    sendInvite(input: $input) {
      success
      message
      invite {
        from
        to
        gameId
      }
    }
  }
`;

export const ACCEPT_INVITE = gql`
  mutation AcceptInvite($inviteId: ID!) {
    acceptInvite(inviteId: $inviteId) {
      success
      message
    }
  }
`;

export const REJECT_INVITE = gql`
  mutation RejectInvite($inviteId: ID!) {
    rejectInvite(inviteId: $inviteId) {
      success
      message
    }
  }
`;
