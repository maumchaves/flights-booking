import { SeatStatus } from "../../clientTypes";
import { Seat } from "../../serverTypes";

type SeatsRow = Seat[][];

const getSeatsInRow = (planeMap: SeatsRow[], requestedSeats: number) => {
  for (let row = 0; row < planeMap.length; row++) {
    const blocks = planeMap[row];
    for (let block = 0; block < blocks.length; block++) {
      const seatsBlockInRow = blocks[block];
      const availableSeatsInRow = seatsBlockInRow.filter(
        seat => seat.status === SeatStatus.Available
      );
      if (availableSeatsInRow.length === requestedSeats) {
        return availableSeatsInRow;
      }
    }
  }
  return [];
};

export default getSeatsInRow;
