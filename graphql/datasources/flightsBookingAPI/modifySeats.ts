import { cloneDeep, set } from "lodash";
import { Seat } from "../../serverTypes";
import { SeatStatus } from "../../clientTypes";

type SeatsRow = Seat[][];

const modifySeats = (
  planeMap: SeatsRow[],
  changingSeats: Omit<Seat, "status">[],
  changes: Partial<Seat>
) => {
  const newSeatsState: SeatsRow[] = cloneDeep(planeMap);
  for (let i = 0; i < changingSeats.length; i++) {
    const changingSeat = { ...changingSeats[i], ...changes };
    set(
      newSeatsState,
      [changingSeat.row, changingSeat.block, changingSeat.position],
      changingSeat
    );
  }
  return newSeatsState;
};

export default modifySeats;
