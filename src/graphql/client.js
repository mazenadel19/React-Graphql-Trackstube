import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";


import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";


const link = new WebSocketLink(
  new SubscriptionClient("wss://react-graphql-myspace.herokuapp.com/v1/graphql", {
    reconnect: true
  })
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client 