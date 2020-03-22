import { useQuery, useMutation } from "@apollo/react-hooks";
import gqlPlaneMapWithSuggestedSeats from "./../graphql/operations/planeMapWithSuggestedSeats.graphql";
import gqlBook from "./../graphql/operations/book.graphql";
import PlaneOccupancyMap from "../components/PlaneOccupancyMap";

import {
  PlaneMapWithSuggestedSeats as PlaneMapWithSuggestedSeatsData,
  Book as BookData
} from "../graphql/clientTypes";
import BackButton from "./BackButton";
import {
  Box,
  Heading,
  Button,
  Flex,
  CircularProgress,
  Text
} from "@chakra-ui/core";

interface BookingSeatsSelectionProps {
  requestedSeats: number;
  traveller: string;
  onBack(): void;
  onConfirm(): void;
}

// Hardcoded: should match the file name in `db/flights/*`.
const FLIGHT_NUMBER = "GFJH876";

const BookingSeatsSelection: React.FC<BookingSeatsSelectionProps> = ({
  requestedSeats,
  traveller,
  onBack,
  onConfirm
}) => {
  const { data, error, loading } = useQuery<PlaneMapWithSuggestedSeatsData>(
    gqlPlaneMapWithSuggestedSeats,
    {
      variables: {
        flightNumber: FLIGHT_NUMBER,
        requestedSeats: requestedSeats
      }
    }
  );

  const handleOnBookCompleted = (bookData: BookData) =>
    bookData.book && onConfirm();

  const [
    book,
    {
      data: bookData,
      loading: bookLoading,
      error: bookError,
      called: bookCalled
    }
  ] = useMutation<BookData>(gqlBook, { onCompleted: handleOnBookCompleted });

  const handleOnConfirm = () => {
    const seatsInput = data.planeMapWithSuggestedSeats.suggestedSeats.map(
      seat => {
        const { __typename, ...seatInput } = seat;
        return seatInput;
      }
    );
    book({
      variables: {
        flightNumber: FLIGHT_NUMBER,
        traveller,
        seats: seatsInput
      }
    });
  };

  const showError = !!(
    error ||
    bookError ||
    (bookCalled && (!bookData || !bookData.book))
  );

  const showNotSeatsFound =
    data && !data.planeMapWithSuggestedSeats.suggestedSeats.length;

  const showPlaneMap = !!(
    !loading &&
    !error &&
    !bookError &&
    !showNotSeatsFound
  );

  return (
    <Box>
      <BackButton onClick={onBack} />
      <Heading as="h3" size="md" my="20px">
        Hello, {traveller}!
      </Heading>
      {showPlaneMap && (
        <Text my="20px">It's time to confirm your booking:</Text>
      )}
      {showNotSeatsFound && (
        <Text my="20px">
          We are sorry! Unfortunately we haven't found seats for your request in
          this flight.
        </Text>
      )}
      {loading && (
        <Flex justify="center" my={10}>
          <CircularProgress isIndeterminate color="teal"></CircularProgress>
        </Flex>
      )}
      {showError && (
        <Flex justify="center" my={10}>
          <Text color="red.500">Something went wrong.</Text>
        </Flex>
      )}
      {showPlaneMap && (
        <Flex direction="column">
          <PlaneOccupancyMap seats={data.planeMapWithSuggestedSeats.planeMap} />
          <Button
            mt={10}
            variantColor="teal"
            type="button"
            onClick={handleOnConfirm}
            isLoading={bookLoading}
          >
            Confirm booking
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default BookingSeatsSelection;
