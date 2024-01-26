import {
  Card,
  CardBody,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const ResultCard = () => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  return (
    <Card mb="20px" w={"100%"} h={400}>
      <CardBody>
        <Flex align="center" w="100%" justify="space-between" mb="30px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize="2xl"
            mb="4px"
          >
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt="10px"
              mb="4px"
            >
              General Information
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              As we live, our hearts turn colder. Cause pain is what we go
              through as we become older. We get insulted by others, lose trust
              for those others. We get back stabbed by friends. It becomes
              harder for us to give others a hand. We get our heart broken by
              people we love, even that we give them all...
            </Text>
            <Text fontWeight="500" color={textColorSecondary} fontSize="sm">
              title
            </Text>
            <Text color={textColorPrimary} fontWeight="500" fontSize="md">
              value
            </Text>
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
