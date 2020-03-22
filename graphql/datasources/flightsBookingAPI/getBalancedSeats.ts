import { Seat } from "../../serverTypes";
import { SeatStatus } from "../../clientTypes";

const MAX_SEATS_PER_ROW = 2;

type SeatsRow = Seat[][];

const getRowsInBlock = (planeMap: SeatsRow[], block: number) => {
  return planeMap.map(row => row[block]);
};

const getSeatsInBlockColumns = (
  block: Seat[][],
  start: number,
  offset: number
) => {
  return block.reduce((acc, current) => {
    return [...acc, ...current.slice(start, start + offset)];
  }, []);
};

const seatsAreInSameRow = (seats: Seat[]) =>
  seats.filter(seat => seat.row === seats[0].row).length === seats.length;

const getAvailableSeatsStartingFromColumn = (
  block: Seat[][],
  column: number,
  requestedSeats: number
) => {
  const seatsToBeChecked = getSeatsInBlockColumns(
    block,
    column,
    MAX_SEATS_PER_ROW
  );

  const requestSeatsIsEvenNumber = !(requestedSeats % 2);

  for (let i = 0; i <= seatsToBeChecked.length - requestedSeats; i++) {
    const seatsGroup = seatsToBeChecked.slice(i, i + requestedSeats);
    const availableSeatsInGroup = seatsGroup.filter(
      seat => seat.status === SeatStatus.Available
    );

    let isValidStartingSeat = seatsAreInSameRow(
      availableSeatsInGroup.slice(0, MAX_SEATS_PER_ROW)
    );

    if (!requestSeatsIsEvenNumber && !isValidStartingSeat) {
      // In this case, we want the first seat to be alone
      isValidStartingSeat = !seatsAreInSameRow(
        availableSeatsInGroup.slice(0, 2)
      );
    }

    if (
      isValidStartingSeat &&
      availableSeatsInGroup.length === requestedSeats
    ) {
      return availableSeatsInGroup;
    }
  }

  return [];
};

const getBalancedSeats = (planeMap: SeatsRow[], requestedSeats: number) => {
  const totalBlocks = planeMap[0].length;
  for (let block = 0; block < totalBlocks; block++) {
    const rowsInCurrentBlock = getRowsInBlock(planeMap, block);
    const totalColumnsInBlock = rowsInCurrentBlock[0].length;
    for (
      let column = 0;
      column + MAX_SEATS_PER_ROW <= totalColumnsInBlock;
      column++
    ) {
      const assignedSeats = getAvailableSeatsStartingFromColumn(
        rowsInCurrentBlock,
        column,
        requestedSeats
      );
      if (assignedSeats.length) {
        return assignedSeats;
      }
    }
  }
  return [];
};

export default getBalancedSeats;
