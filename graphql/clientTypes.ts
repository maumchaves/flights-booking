/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Book
// ====================================================

export interface Book {
  book: boolean | null;
}

export interface BookVariables {
  flightNumber: string;
  traveller: string;
  seats: SeatInput[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlaneMapWithSuggestedSeats
// ====================================================

export interface PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats_planeMap {
  __typename: "Seat";
  status: SeatStatus;
  row: number;
  block: number;
  position: number;
}

export interface PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats_suggestedSeats {
  __typename: "Seat";
  row: number;
  block: number;
  position: number;
}

export interface PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats {
  __typename: "PlaneMapWithSuggestedSeats";
  planeMap: PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats_planeMap[][][];
  suggestedSeats: PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats_suggestedSeats[];
}

export interface PlaneMapWithSuggestedSeats {
  planeMapWithSuggestedSeats: PlaneMapWithSuggestedSeats_planeMapWithSuggestedSeats | null;
}

export interface PlaneMapWithSuggestedSeatsVariables {
  flightNumber: string;
  requestedSeats: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlaneOccupancyMap
// ====================================================

export interface PlaneOccupancyMap_planeOccupancyMap {
  __typename: "Seat";
  status: SeatStatus;
  row: number;
  block: number;
  position: number;
}

export interface PlaneOccupancyMap {
  planeOccupancyMap: PlaneOccupancyMap_planeOccupancyMap[][][];
}

export interface PlaneOccupancyMapVariables {
  flightNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SeatStatus {
  Available = "Available",
  Booked = "Booked",
  Selected = "Selected",
}

export interface SeatInput {
  traveller?: string | null;
  row: number;
  block: number;
  position: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
