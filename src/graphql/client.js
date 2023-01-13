import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GET_QUEUED_SONGS } from "./queries";

const link = new WebSocketLink(
  new SubscriptionClient(
    "wss://learninggraphqlz.hasura.app/v1/graphql",
    {
      reconnect: true,
    }
  )
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  typeDefs: gql`
    # this is what the song in the queue will have
    type Song {
      artist: String!
      duration: Float!
      id: uuid!
      thumbnail: String!
      title: String!
      url: String!
    }

    type Query {
      queue: [Song]!
    }

    input SongInput {
      artist: String!
      duration: Float!
      id: uuid!
      thumbnail: String!
      title: String!
      url: String!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
  // resolver will tell us what to do with data collected in Mutation
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        const queryResult = cache.readQuery({ query: GET_QUEUED_SONGS });
        if (queryResult) {
          const { queue } = queryResult;
          const isInQueue = queue.some((song) => song.id === input.id);
          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input];

          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: { queue: newQueue },
          });

          return newQueue;
        }
        return [];
      },
    },
  },
});

const hasQueue = Boolean(localStorage.getItem("queue"));

client.writeQuery({
  query: GET_QUEUED_SONGS,
  data: {
    queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
  },
});

export default client;
