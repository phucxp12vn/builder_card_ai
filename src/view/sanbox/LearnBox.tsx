import { useEffect, useRef, useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  Center,
  IconButton,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

import { Transcript, Video } from '@/api/transcriptApi';
import { useGetTranscript, useGetVideos } from '@/hook/useTranscript';

import TranscriptFormModal from './components/TranscriptFormModal';
import TranscriptSummaryModal from './components/TranscriptSummaryModal';

const opts: YouTubeProps['opts'] = {
  width: '100%',
  playerVars: {
    autoplay: 0, // Auto-play the video on load
    controls: 0, // Show pause/play buttons in player
    showinfo: 0, // Hide the video title
    modestbranding: 1, // Hide the Youtube Logo
    fs: 1, // Hide the full screen button
    cc_load_policy: 0, // Hide closed captions
    iv_load_policy: 3, // Hide the Video Annotations
    autohide: 0, // Hide video controls when playing
  },
};

const SelectVideoLearn = ({
  videoId,
  onSelect,
  videos,
}: {
  videoId: string;
  onSelect: (e: any) => void;
  videos: Video[];
}) => {
  return (
    <Select
      placeholder="Select video"
      value={videos.find((video) => video.videoId === videoId)?.title ?? ''}
      onChange={onSelect}
    >
      {videos?.map(({ videoId, title }) => <option key={videoId}>{title}</option>)}
    </Select>
  );
};

const availablePlaybackRates = [1, 0.75, 0.5];

const LearnBox = () => {
  const [videoId, setVideoId] = useState('');
  const playerVideo = useRef<YouTubePlayer | null>(null);
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const { isOpen: isOpenSummary, onOpen: onOpenSummary, onClose: onCloseSummary } = useDisclosure();
  const { data: transcript } = useGetTranscript(videoId);
  const { data: videos } = useGetVideos();
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
  }, [focusTranscript, videoId]);

  useEffect(() => {
    if (repeated && focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
  }, [repeated, focusTranscript, videoId]);

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

  const handleSelectVideo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playerVideo.current = null;
    setVideoId(videos?.[e.target.selectedIndex - 1].videoId ?? '');
  };

  return (
    <Card p={4} minH="100vh">
      {videoId !== '' ? (
        <>
          <Box mx="auto" w="100%" maxW="800px">
            <YouTube
              videoId={videoId}
              opts={opts}
              style={{ width: '100%' }}
              onReady={handlePlayerReady}
              onStateChange={handlePlayerChange}
            />
          </Box>
          <Stack direction={{ sm: 'column', md: 'row' }} my={4}>
            <Button onClick={onOpenAdd} my={{ sm: 0, md: 4 }}>
              Add new transcript
            </Button>
            <Button onClick={onOpenSummary} my={{ sm: 0, md: 4 }}>
              Transcript summary
            </Button>
            <Center w={{ sm: '100%', md: '200px' }}>
              <SelectVideoLearn
                videoId={videoId}
                videos={videos ?? []}
                onSelect={handleSelectVideo}
              />
            </Center>
          </Stack>
          <TranscriptFormModal videoId={videoId} isOpen={isOpenAdd} onClose={onCloseAdd} />
          <TranscriptSummaryModal
            videoId={videoId}
            isOpen={isOpenSummary}
            onClose={onCloseSummary}
          />
          <Box
            rounded="16px"
            border="1px"
            borderColor="gray.200"
            px={10}
            py={5}
            position="relative"
            minHeight="300px"
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
        </>
      ) : (
        <Center h="100vh">
          <Stack width="300px">
            <Text align="center">Video Not Found</Text>
            <SelectVideoLearn
              videoId={videoId}
              videos={videos ?? []}
              onSelect={handleSelectVideo}
            />
          </Stack>
        </Center>
      )}
    </Card>
  );
};

export default LearnBox;
