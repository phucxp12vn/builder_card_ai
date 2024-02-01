import { useCallback } from "react";
import { Box, Text, Image } from "@chakra-ui/react";

import Carousel from "components/carousel/Carousel";
import { useUpdateCards } from "hook/useCard";

const ImagesCard = (props: { word: string; pictures: string[] }) => {
  const { word, pictures } = props;
  const updateCard = useUpdateCards();

  const handleSelectImage = useCallback(
    (indexUrl: number) => {
      const selectedImage = pictures?.[indexUrl] ?? "";
      updateCard(word, selectedImage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [word, pictures]
  );

  return (
    <Box>
      <Box minHeight={300} height={300} minW={340} width={340}>
        <Carousel gap={0} onActiveItem={handleSelectImage}>
          {pictures.map((url, index) => (
            <Image
              key={index}
              src={url}
              borderRadius="8px"
              objectFit="cover"
              width={"100%"}
              height={"100%"}
            />
          ))}
        </Carousel>
      </Box>
      <Text
        mt="5px"
        textAlign="center"
        fontWeight="500"
        color={"gray.400"}
        fontSize="20px"
      >
        Selected this picture
      </Text>
    </Box>
  );
};

export default ImagesCard;
