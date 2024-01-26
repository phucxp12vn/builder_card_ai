import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMagicFill } from "react-icons/ri";


const BuildForm = () => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} p={"20px"}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        AI Build Card
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px">
        Work great for listicle e.g. 7 tip for house painting or How to use AI
        for copy writing?
      </Text>
      <Divider color={textColorSecondary} my="8px" />
      <Box>
        <Text color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
          Words
        </Text>
        <Input
          placeholder="Please input the word"
          value={""}
          //   onChange={handleInputNewWord}
        />
        <Divider color={textColorSecondary} my="12px" />
        <Flex w="100%" justifyContent={"end"}>
          <Button
            leftIcon={<RiMagicFill />}
            mb="5px"
            minW="120px"
            mt={{ base: "20px", "2xl": "auto" }}
            variant="solid"
            fontWeight="500"
            colorScheme="blue"
          >
            Build
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};

export default BuildForm;
