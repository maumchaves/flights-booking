import { Seat } from "../../serverTypes";
import { flattenDeep, random } from "lodash";

type SeatsRow = Seat[][];

const getRandomSeats = (planeMap: SeatsRow[], requestedSeats: number) => {
  let allAvailableSeats = flattenDeep(planeMap);
  if (allAvailableSeats.length < requestedSeats) {
    return [];
  }
  if (allAvailableSeats.length === requestedSeats) {
    return allAvailableSeats;
  }

  const randomSeats = [];

  for (let i = 0; i < requestedSeats; i++) {
    const randomIndex = random(0, allAvailableSeats.length - 1);
    randomSeats.push(allAvailableSeats[randomIndex]);
    allAvailableSeats = [
      ...allAvailableSeats.slice(0, randomIndex),
      ...allAvailableSeats.slice(randomIndex + 1, allAvailableSeats.length)
    ];
  }
  return randomSeats;
};

export default getRandomSeats;
