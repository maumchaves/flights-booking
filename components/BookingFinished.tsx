import { Flex, Button, Heading } from "@chakra-ui/core";

interface BookingFinishedProps {
  onBookAgain(): void;
}

const BookingFinished: React.FC<BookingFinishedProps> = ({ onBookAgain }) => (
  <Flex justify="center" direction="column" my={10}>
    <Heading as="h3" size="lg" color="green.500" textAlign="center">
      Your flight has been booked.
    </Heading>
    <Button mt={10} variantColor="teal" type="button" onClick={onBookAgain}>
      Book a new flight
    </Button>
  </Flex>
);

export default BookingFinished;
