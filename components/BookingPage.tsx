import { Heading, Box, Icon } from "@chakra-ui/core";
import BookingForm from "../components/BookingForm";
import BookingSeatsSelection from "../components/BookingSeatsSelection";
import { useState } from "react";
import BookingFinished from "./BookingFinished";

enum BookingStep {
  Initial,
  Selection,
  Finished,
}

const BookingPage: React.FC = () => {
  const [step, setStep] = useState(BookingStep.Initial);
  const [traveller, setTraveller] = useState("");
  const [requestedSeats, setRequestedSeats] = useState(0);

  const handleOnInitialFormSubmit = (
    fullName: string,
    requestedSeats: number
  ) => {
    setStep(BookingStep.Selection);
    setTraveller(fullName);
    setRequestedSeats(requestedSeats);
  };

  const handleOnGoToInitial = () => setStep(BookingStep.Initial);

  const handleOnConfirmBooking = () => setStep(BookingStep.Finished);

  const stepViews = {
    [BookingStep.Initial]: <BookingForm onSubmit={handleOnInitialFormSubmit} />,
    [BookingStep.Selection]: (
      <BookingSeatsSelection
        requestedSeats={requestedSeats}
        traveller={traveller}
        onBack={handleOnGoToInitial}
        onConfirm={handleOnConfirmBooking}
      />
    ),
    [BookingStep.Finished]: (
      <BookingFinished onBookAgain={handleOnGoToInitial} />
    ),
  };

  return (
    <Box p='10px' maxW='500px' mx='auto' mb='50px'>
      <Heading as='h1' textAlign='center' mt='20px' mb='40px'>
        <Icon name='sun' />
        <Box d='inline' verticalAlign='middle' ml='10px'>
          Flights Booking!
        </Box>
      </Heading>
      {stepViews[step]}
    </Box>
  );
};

export default BookingPage;
