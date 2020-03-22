import { Seat as SeatWithTraveller } from "../graphql/serverTypes";
import { Button, Box, Flex, Divider, ButtonProps } from "@chakra-ui/core";
import { SeatStatus } from "../graphql/clientTypes";

type SeatObject = Omit<SeatWithTraveller, "traveller">;

type SeatsRow = SeatObject[][];

const COLUMNS_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Aisle: React.FC = () => <Box d="inline" mx="15px" />;

interface SeatProps {
  seat: SeatObject;
  id: string;
  width?: string;
}

const seatStatusStyles: { [k in SeatStatus]: Partial<ButtonProps> } = {
  [SeatStatus.Available]: {
    variantColor: "blue",
    variant: "outline",
    _disabled: {
      cursor: "not-allowed",
      boxShadow: "none"
    }
  },
  [SeatStatus.Booked]: {},
  [SeatStatus.Selected]: {
    variantColor: "green",

    _disabled: {
      cursor: "not-allowed",
      boxShadow: "none"
    }
  }
};

const Seat: React.FC<SeatProps> = ({ id, seat, width = "30px" }) => (
  <Button
    key={id}
    // Manual selection is not supported yet so it is always disabled
    // isDisabled={seat.status !== SeatStatus.Available}
    isDisabled={true}
    size="xs"
    width={width}
    m="2px"
    {...seatStatusStyles[seat.status]}
  >
    {id}
  </Button>
);

interface RowBlockProps {
  block: SeatObject[];
  blockNumber: number;
  startingColumn: number;
  rowNumber: number;
}

const RowBlock: React.FC<RowBlockProps> = ({
  block,
  blockNumber,
  startingColumn,
  rowNumber
}) => {
  let currentColumn = startingColumn;
  return (
    <Flex key={blockNumber}>
      {blockNumber ? <Aisle /> : null}
      {block.map(seat => {
        currentColumn++;
        const seatId = COLUMNS_LETTERS[currentColumn - 1] + (rowNumber + 1);
        return <Seat key={seatId} id={seatId} seat={seat} />;
      })}
    </Flex>
  );
};

interface RowProps {
  row: SeatsRow;
  rowNumber: number;
}

const Row: React.FC<RowProps> = ({ row, rowNumber }) => {
  let seatCounterPerRow = 0;
  return (
    <Flex>
      {row.map((block, blockNumber) => {
        const rowBlock = (
          <RowBlock
            key={blockNumber}
            block={block}
            blockNumber={blockNumber}
            startingColumn={seatCounterPerRow}
            rowNumber={rowNumber}
          />
        );
        seatCounterPerRow += block.length;
        return rowBlock;
      })}
    </Flex>
  );
};

interface Props {
  seats: SeatsRow[];
}

const PlaneOccupancyMap: React.FC<Props> = ({ seats }) => (
  <Flex direction="column" align="center">
    <Box>
      <Flex pointerEvents={"none"}>
        <Seat
          id="Selected"
          seat={{ status: SeatStatus.Selected, row: 0, block: 0, position: 0 }}
          width="auto"
        />
        <Seat
          id="Available"
          seat={{ status: SeatStatus.Available, row: 0, block: 0, position: 0 }}
          width="auto"
        />
        <Seat
          id="Not available"
          seat={{
            status: SeatStatus.Booked,
            row: 0,
            block: 0,
            position: 0
          }}
          width="auto"
        />
      </Flex>
      <Divider my="15px" />
    </Box>
    {seats.map((row, rowNumber) => (
      <Row key={rowNumber} row={row} rowNumber={rowNumber} />
    ))}
  </Flex>
);

export default PlaneOccupancyMap;
