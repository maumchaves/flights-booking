import { DataSource } from "apollo-datasource";
import { Seat, PlaneMapWithSuggestedSeats, SeatInput } from "../../serverTypes";
import getBalancedSeats from "./getBalancedSeats";
import getSeatsInRow from "./getSeatsInRow";
import getSeatsAcrossAisle from "./getSeatsAcrossAisle";
import getRandomSeats from "./getRandomSeats";
import modifySeats from "./modifySeats";
import { SeatStatus } from "../../clientTypes";
import { readFlightDoc, writeFlightDoc } from "./dbAPI";

type SeatsRow = Seat[][];

class FlightsBookingAPI extends DataSource {
  constructor() {
    super();
  }

  async getPlaneOccupancyMap(flightNumber: string): Promise<SeatsRow[]> {
    return readFlightDoc(flightNumber).planeMap;
  }

  async getPlaneMapWithSuggestedSeats(
    flightNumber: string,
    requestedSeats: number
  ): Promise<PlaneMapWithSuggestedSeats> {
    const currentPlaneMap = await this.getPlaneOccupancyMap(flightNumber);
    let suggestedSeats = getSeatsInRow(currentPlaneMap, requestedSeats);
    if (!suggestedSeats.length) {
      suggestedSeats = getBalancedSeats(currentPlaneMap, requestedSeats);
    }
    if (!suggestedSeats.length) {
      suggestedSeats = getSeatsAcrossAisle(currentPlaneMap, requestedSeats);
    }
    if (!suggestedSeats.length) {
      suggestedSeats = getRandomSeats(currentPlaneMap, requestedSeats);
    }
    const planeMap = modifySeats(currentPlaneMap, suggestedSeats, {
      status: SeatStatus.Selected
    });
    return {
      planeMap,
      suggestedSeats
    };
  }

  async bookSeats(
    flightNumber: string,
    traveller: string,
    seats: SeatInput[]
  ): Promise<boolean> {
    const flightDoc = readFlightDoc(flightNumber);
    const currentPlaneMap = flightDoc.planeMap;
    flightDoc.planeMap = modifySeats(currentPlaneMap, seats, {
      status: SeatStatus.Booked,
      traveller
    });
    writeFlightDoc(flightNumber, flightDoc);
    return true;
  }
}

export default FlightsBookingAPI;
