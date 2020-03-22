import { ApolloServer, makeExecutableSchema } from "apollo-server-micro";
import FlightsBookingAPI from "../../graphql/datasources/flightsBookingAPI";
import resolvers from "./../../graphql/resolvers";

import typeDefs from "./../../graphql/schema.graphql";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const apolloServer = new ApolloServer({
  schema,
  dataSources: () => ({
    flightsAPI: new FlightsBookingAPI()
  })
});

// https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
