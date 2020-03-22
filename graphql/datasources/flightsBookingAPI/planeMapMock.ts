import { Seat } from "../../serverTypes";

type SeatsRow = Seat[][];

let seats: SeatsRow[] = Array(13).fill(
  [
    [{ status: "Booked" }, { status: "Booked" }, { status: "Booked" }],
    [{ status: "Available" }, { status: "Available" }, { status: "Available" }]
  ],
  0,
  13
);

seats = [
  ...seats,
  ...Array(13).fill(
    [
      [{ status: "Booked" }, { status: "Booked" }, { status: "Booked" }],
      [
        { status: "Available" },
        { status: "Available" },
        { status: "Available" }
      ]
    ],
    0,
    13
  )
];

seats = seats.map((row, rowNumber) =>
  row.map((block, blockNumber) =>
    block.map((seat, i) => ({
      ...seat,
      row: rowNumber,
      block: blockNumber,
      position: i
    }))
  )
);

export default seats;
