import { Flex, Link, Icon } from "@chakra-ui/core";

interface BackButtonProps {
  onClick(): void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <Flex>
    <Link onClick={onClick}>
      <Flex align="center">
        <Icon name="arrow-back" />
        Back
      </Flex>
    </Link>
  </Flex>
);

export default BackButton;
