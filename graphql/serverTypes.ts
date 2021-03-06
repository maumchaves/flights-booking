import { ResolverContext } from "./resolvers";
/* tslint:disable */
/* eslint-disable */
import { GraphQLResolveInfo } from 'graphql';
/**
 * This file is auto-generated by graphql-schema-typescript
 * Please note that any changes in this file may be overwritten
 */
 

/*******************************
 *                             *
 *          TYPE DEFS          *
 *                             *
 *******************************/
export interface Query {
  planeOccupancyMap: Array<Array<Array<Seat>>>;
  planeMapWithSuggestedSeats: PlaneMapWithSuggestedSeats | null;
}

export interface Seat {
  traveller: string | null;
  status: SeatStatus;
  row: number;
  block: number;
  position: number;
}

export type SeatStatus = 'Available' | 'Booked' | 'Selected';

export interface PlaneMapWithSuggestedSeats {
  planeMap: Array<Array<Array<Seat>>>;
  suggestedSeats: Array<Seat>;
}

export interface Mutation {
  book: boolean | null;
}

export interface SeatInput {
  traveller: string | null;
  row: number;
  block: number;
  position: number;
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface Resolver {
  Query: QueryTypeResolver;
  Seat: SeatTypeResolver;
  PlaneMapWithSuggestedSeats: PlaneMapWithSuggestedSeatsTypeResolver;
  Mutation: MutationTypeResolver;
}
export interface QueryTypeResolver<TParent = any> {
  planeOccupancyMap: QueryToPlaneOccupancyMapResolver<TParent>;
  planeMapWithSuggestedSeats: QueryToPlaneMapWithSuggestedSeatsResolver<TParent>;
}

export interface QueryToPlaneOccupancyMapArgs {
  flightNumber: string;
}
export interface QueryToPlaneOccupancyMapResolver<TParent = any, TResult = Array<Array<Array<Seat>>>> {
  (parent: TParent, args: QueryToPlaneOccupancyMapArgs, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface QueryToPlaneMapWithSuggestedSeatsArgs {
  flightNumber: string;
  requestedSeats: number;
}
export interface QueryToPlaneMapWithSuggestedSeatsResolver<TParent = any, TResult = PlaneMapWithSuggestedSeats | null> {
  (parent: TParent, args: QueryToPlaneMapWithSuggestedSeatsArgs, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface SeatTypeResolver<TParent = any> {
  traveller: SeatToTravellerResolver<TParent>;
  status: SeatToStatusResolver<TParent>;
  row: SeatToRowResolver<TParent>;
  block: SeatToBlockResolver<TParent>;
  position: SeatToPositionResolver<TParent>;
}

export interface SeatToTravellerResolver<TParent = any, TResult = string | null> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface SeatToStatusResolver<TParent = any, TResult = SeatStatus> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface SeatToRowResolver<TParent = any, TResult = number> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface SeatToBlockResolver<TParent = any, TResult = number> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface SeatToPositionResolver<TParent = any, TResult = number> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface PlaneMapWithSuggestedSeatsTypeResolver<TParent = any> {
  planeMap: PlaneMapWithSuggestedSeatsToPlaneMapResolver<TParent>;
  suggestedSeats: PlaneMapWithSuggestedSeatsToSuggestedSeatsResolver<TParent>;
}

export interface PlaneMapWithSuggestedSeatsToPlaneMapResolver<TParent = any, TResult = Array<Array<Array<Seat>>>> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface PlaneMapWithSuggestedSeatsToSuggestedSeatsResolver<TParent = any, TResult = Array<Seat>> {
  (parent: TParent, args: {}, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}

export interface MutationTypeResolver<TParent = any> {
  book: MutationToBookResolver<TParent>;
}

export interface MutationToBookArgs {
  flightNumber: string;
  traveller: string;
  seats: Array<SeatInput>;
}
export interface MutationToBookResolver<TParent = any, TResult = boolean | null> {
  (parent: TParent, args: MutationToBookArgs, context: ResolverContext, info: GraphQLResolveInfo): TResult | Promise<TResult>;
}
