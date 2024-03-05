import { useEffect, useRef, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

import { Transcript } from '@/api/transcriptApi';
import { useGetTranscript } from '@/hook/useTranscript';

import TranscriptModal from './components/TranscriptModal';

const opts: YouTubeProps['opts'] = {
  height: '300',
  width: '530',
  playerVars: {
    autoplay: 0, // Auto-play the video on load
    controls: 0, // Show pause/play buttons in player
    showinfo: 0, // Hide the video title
    modestbranding: 1, // Hide the Youtube Logo
    fs: 1, // Hide the full screen button
    cc_load_policy: 0, // Hide closed captions
    iv_load_policy: 3, // Hide the Video Annotations
    start: 14,
    end: 18,
    autohide: 0, // Hide video controls when playing
  },
};

const videoId = 'NGx7LM-cncs';

const availablePlaybackRates = [1, 0.75, 0.5];

const LearnBox = () => {
  const playerVideo = useRef<YouTubePlayer | null>(null);
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const { data: transcript } = useGetTranscript(videoId);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [focusTranscript, setFocusTranscript] = useState<Transcript | null>(null);
  const [repeated] = useState(true);
  const [playRateIndex, setPlayRateIndex] = useState(0);

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  useEffect(() => {
    if (transcript && transcript.length > 0) {
      setFocusTranscript(transcript[transcriptIndex]);
    }
  }, [transcript, transcriptIndex]);

  useEffect(() => {
    if (focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
  }, [focusTranscript]);

  useEffect(() => {
    if (repeated && focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
  }, [repeated, focusTranscript]);

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    playerVideo.current = event.target;
    if (focusTranscript) {
      event.target.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
    event.target.playVideo();
  };

  const handlePlayerChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.ENDED && repeated && focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
      playerVideo?.current.playVideo();
    }
  };

  // const handleChangeRepeat = () => {
  //   setRepeated((preValue) => !preValue);
  // };

  const handleChangePlayRate = () => {
    const newPlayRateIndex =
      playRateIndex === availablePlaybackRates.length - 1 ? 0 : playRateIndex + 1;
    const newPlayRate = availablePlaybackRates[newPlayRateIndex];
    playerVideo?.current.setPlaybackRate(newPlayRate);
    setPlayRateIndex(newPlayRateIndex);
  };

  const handlePlayAgain = () => {
    if (focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
  };

  const handleNext = () => {
    setTranscriptIndex((preIndex) =>
      transcript == null || transcript?.length - 1 === preIndex ? preIndex : preIndex + 1
    );
  };

  const handlePrevious = () => {
    setTranscriptIndex((preIndex) => (preIndex === 0 ? 0 : preIndex - 1));
  };

  return (
    <Card p={4} h="100vh">
      <Box mx="auto">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={handlePlayerReady}
          onStateChange={handlePlayerChange}
        />
      </Box>
      <Box mt={4}>
        <Button onClick={onOpenAdd} my={4}>
          Add new transcript
        </Button>
      </Box>
      {/* <Box mt={4}>
        <Text>Repeat</Text>
        <Switch id="isChecked" isChecked={repeated} onChange={handleChangeRepeat} />
      </Box> */}
      <TranscriptModal videoId={videoId} isOpen={isOpenAdd} onClose={onCloseAdd} />
      <Box
        rounded="16px"
        border="1px"
        borderColor="gray.200"
        px={10}
        py={5}
        position="relative"
        height="calc(100% - 200px)"
      >
        <Button variant="outline" size="md" onClick={handleChangePlayRate}>
          {availablePlaybackRates[playRateIndex]}x
        </Button>
        {transcript?.[transcriptIndex] ? (
          <Box onClick={handlePlayAgain} h={'calc(100% - 80px)'}>
            <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mb="4px">
              {transcript?.[transcriptIndex].content}
            </Text>
          </Box>
        ) : (
          <Box>No data for transcript</Box>
        )}
        {transcript && (
          <Text h="5px">
            <strong>{transcriptIndex + 1}</strong>
            {`/${transcript?.length}`}
          </Text>
        )}
        <IconButton
          size="md"
          aria-label="previous"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevious}
          position={'absolute'}
          left="0"
          top="50%"
          transform={'translateY(-50%)'}
        />
        <IconButton
          size="md"
          aria-label="next"
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          position={'absolute'}
          right="0"
          top="50%"
          transform={'translateY(-50%)'}
        />
      </Box>
    </Card>
  );
};

export default LearnBox;
