import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:7000/graphql", // GraphQL endpoint
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default client;
