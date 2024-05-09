import { Center, Stack, Text } from '@chakra-ui/react';

import GenerateNewVideo from './GenerateNewVideo';
import SelectLearnVideo from './SelectLearnVideo';

const NoChoseVideo = () => {
  return (
    <Center h="100vh">
      <Stack maxWidth="600px">
        <Text align="center">Select your video</Text>
        <SelectLearnVideo />
        <Text align="center">or</Text>
        <GenerateNewVideo />
      </Stack>
    </Center>
  );
};

export default NoChoseVideo;
