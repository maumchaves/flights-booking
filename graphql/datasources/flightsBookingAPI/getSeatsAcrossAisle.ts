import { Seat } from "../../serverTypes";
import getBalancedSeats from "./getBalancedSeats";

type SeatsRow = Seat[][];

const getSeatsAcrossAisle = (planeMap: SeatsRow[], requestedSeats: number) => {
  const mapWithOnlySeatsInAisle = planeMap.map(row =>
    row.reduce<SeatsRow>((acc, currentBlock, i, blocks) => {
      if (i === row.length - 1) return acc;
      const nextBlock = blocks[i + 1];
      const lastSeatInCurrentBlock = currentBlock[currentBlock.length - 1];
      const firstSeatInNextBlock = nextBlock[0];
      return [...acc, [lastSeatInCurrentBlock, firstSeatInNextBlock]];
    }, [])
  );
  return getBalancedSeats(mapWithOnlySeatsInAisle, requestedSeats);
};

export default getSeatsAcrossAisle;
