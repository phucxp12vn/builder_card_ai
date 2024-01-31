import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMagicFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useBuildCards } from "hook/useCard";

const BuildForm = () => {
  const { mutate, isPending } = useBuildCards();
  const formik = useFormik({
    initialValues: {
      words: "",
    },
    validationSchema: Yup.object({
      words: Yup.string().required("Please input at least one word."),
    }),
    onSubmit: (values) => mutate(values.words.split(";")),
  });

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
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            isInvalid={Boolean(formik.errors.words) && formik.touched.words}
          >
            <FormLabel
              color={textColorPrimary}
              fontWeight="500"
              fontSize="md"
              mb="4px"
            >
              Words
            </FormLabel>
            <Input
              id="words"
              name={"words"}
              value={formik.values.words}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Please input the words"
            />
            <FormErrorMessage>{formik.errors.words}</FormErrorMessage>
          </FormControl>
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
              isLoading={isPending}
              loadingText='Building'
              type="submit"
            >
              Build
            </Button>
          </Flex>
        </form>
      </Box>
    </Card>
  );
};

export default BuildForm;
