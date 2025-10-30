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
