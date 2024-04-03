import { Center, Stack, Text } from '@chakra-ui/react';

import SelectLearnVideo from './SelectLearnVideo';

const NoChoseVideo = () => {
  return (
    <Center h="100vh">
      <Stack width="300px">
        <Text align="center">Video Not Found</Text>
        <SelectLearnVideo />
      </Stack>
    </Center>
  );
};

export default NoChoseVideo;
