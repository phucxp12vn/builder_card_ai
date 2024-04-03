import { Center, Stack, Text } from '@chakra-ui/react';

import SelectLearnVideo from './SelectLearnVideo';

const NoChoseVideo = ({ videoId, videos, onSelect }: any) => {
  return (
    <Center h="100vh">
      <Stack width="300px">
        <Text align="center">Video Not Found</Text>
        <SelectLearnVideo videoId={videoId} videos={videos ?? []} onSelect={onSelect} />
      </Stack>
    </Center>
  );
};

export default NoChoseVideo;
