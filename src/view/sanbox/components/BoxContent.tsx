import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Text, useColorModeValue } from '@chakra-ui/react';

import { useGetTranscript } from '@/hook/useTranscript';

const availablePlaybackRates = [1, 0.75, 0.5];

const BoxContent = ({
  videoId,
  transcriptIndex,
  playRateIndex,
  onNext,
  onPrev,
  onChangeRate,
}: any) => {
  const { data: transcript } = useGetTranscript(videoId);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box
      rounded="16px"
      border="1px"
      borderColor="gray.200"
      px={10}
      py={5}
      position="relative"
      minHeight="300px"
    >
      <Button variant="outline" size="md" onClick={onChangeRate}>
        {availablePlaybackRates[playRateIndex]}x
      </Button>
      {transcript?.[transcriptIndex] ? (
        <Box h={'calc(100% - 80px)'}>
          <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mb="4px">
            {transcript?.[transcriptIndex].content}
          </Text>
        </Box>
      ) : (
        <Box>No data for transcript</Box>
      )}
      {(transcript?.length ?? 0) > 0 && (
        <Text>
          <strong>{transcriptIndex + 1}</strong>
          {`/${transcript?.length}`}
        </Text>
      )}
      <IconButton
        size="md"
        aria-label="previous"
        icon={<ChevronLeftIcon />}
        onClick={onPrev}
        position={'absolute'}
        left="0"
        top="50%"
        transform={'translateY(-50%)'}
      />
      <IconButton
        size="md"
        aria-label="next"
        icon={<ChevronRightIcon />}
        onClick={onNext}
        position={'absolute'}
        right="0"
        top="50%"
        transform={'translateY(-50%)'}
      />
    </Box>
  );
};

export default BoxContent;
