import { IResolvers } from "graphql-tools";
import FlightsBookingAPI from "./datasources/flightsBookingAPI/flightsBookingAPI";
import {
  QueryToPlaneMapWithSuggestedSeatsResolver,
  QueryToPlaneOccupancyMapResolver,
  MutationToBookResolver
} from "./serverTypes";

export interface ResolverContext {
  dataSources: {
    flightsAPI: FlightsBookingAPI;
  };
}

const planeOccupancyMap: QueryToPlaneOccupancyMapResolver = (
  _,
  { flightNumber },
  { dataSources }
) => dataSources.flightsAPI.getPlaneOccupancyMap(flightNumber);

const planeMapWithSuggestedSeats: QueryToPlaneMapWithSuggestedSeatsResolver = (
  _,
  { flightNumber, requestedSeats },
  { dataSources }
) =>
  dataSources.flightsAPI.getPlaneMapWithSuggestedSeats(
    flightNumber,
    requestedSeats
  );

const book: MutationToBookResolver = (
  _,
  { flightNumber, traveller, seats },
  { dataSources }
) => dataSources.flightsAPI.bookSeats(flightNumber, traveller, seats);

const resolvers: IResolvers<any, ResolverContext> = {
  Query: {
    planeOccupancyMap,
    planeMapWithSuggestedSeats
  },
  Mutation: {
    book
  }
};

export default resolvers;
