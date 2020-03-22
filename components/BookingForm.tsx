import {
  Input,
  Box,
  FormControl,
  FormLabel,
  Select,
  Button
} from "@chakra-ui/core";
import { useState } from "react";

interface BookingFormProps {
  onSubmit(fullName: string, requestedSeats: number): void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [requestedSeats, setRequestedSeats] = useState(0);

  const handleOnSubmit = () => {
    setSubmitted(true);
    if (fullName && requestedSeats) {
      onSubmit(fullName, requestedSeats);
    }
  };

  return (
    <Box my="20px">
      <FormControl isRequired mb="20px">
        <FormLabel htmlFor="fullName">Full name</FormLabel>
        <Input
          isInvalid={submitted && !fullName}
          id="fullName"
          value={fullName}
          onChange={(event: any) => setFullName(event.target.value)}
          placeholder="Full name"
        />
      </FormControl>
      <FormControl isRequired mb="20px">
        <FormLabel htmlFor="requestedSeats">Number of seats</FormLabel>
        <Select
          isInvalid={submitted && !requestedSeats}
          id="requestedSeats"
          value={requestedSeats}
          onChange={(event: any) =>
            setRequestedSeats(parseInt(event.target.value))
          }
          placeholder="Select the number of seats"
        >
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </Select>
      </FormControl>
      <Button mt={4} variantColor="teal" type="button" onClick={handleOnSubmit}>
        Continue
      </Button>
    </Box>
  );
};

export default BookingForm;
