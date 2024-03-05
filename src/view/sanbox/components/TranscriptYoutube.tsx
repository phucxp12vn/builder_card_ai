import { Box, Text } from '@chakra-ui/react';

import { useGetTranscriptYoutube } from '@/hook/useTranscript';

const TranscriptYoutube = ({ videoId }: any) => {
  const { data: transcript } = useGetTranscriptYoutube(videoId);

  return (
    <Box minH="100%" overflow={'auto'} width="100%">
      {transcript?.map(({ text, time }, index) => (
        <Box key={index}>
          <Text fontSize="md" me="26px">
            {text}
          </Text>
          <Box float={'right'}>{time}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default TranscriptYoutube;
