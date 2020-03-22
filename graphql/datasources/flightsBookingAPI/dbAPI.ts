import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { Seat } from "../../serverTypes";

type SeatsRow = Seat[][];

interface FlightDoc {
  planeMap: SeatsRow[];
}

const cwd = process.cwd();

export const readFlightDoc = (flightNumber: string): FlightDoc => {
  const flightDocPath = path.join(cwd, "db", "flights", `${flightNumber}.json`);
  return JSON.parse(readFileSync(flightDocPath, { encoding: "utf-8" }));
};

export const writeFlightDoc = (
  flightNumber: string,
  newFlightDoc: FlightDoc
) => {
  const flightDocPath = path.join(cwd, "db", "flights", `${flightNumber}.json`);
  writeFileSync(flightDocPath, JSON.stringify(newFlightDoc), {
    encoding: "utf-8"
  });
};
