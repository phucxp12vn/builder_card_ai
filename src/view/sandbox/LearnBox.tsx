import { useContext, useEffect, useRef, useState } from 'react';

import { Card } from '@chakra-ui/react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

import { Transcript } from '@/api/transcriptApi';
import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useGetTranscript } from '@/hook/useTranscript';

import BoxAction from './components/boxAction/BoxAction';
import BoxContent from './components/BoxContent';
import NoChoseVideo from './components/NoChoseVideo';
import YoutubeVideo from './components/YoutubeVideo';

const availablePlaybackRates = [1, 0.75, 0.5];

const LearnBox = () => {
  const { videoId } = useContext(LearnBoxContext) as LearnBoxType;
  const playerVideo = useRef<YouTubePlayer | null>(null);
  const { data: transcript } = useGetTranscript(videoId);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [focusTranscript, setFocusTranscript] = useState<Transcript | null>(null);
  const [playRateIndex, setPlayRateIndex] = useState(0);

  useEffect(() => {
    if (transcript && transcript.length > 0) {
      setFocusTranscript(transcript[transcriptIndex]);
    }
  }, [transcript, transcriptIndex]);

  useEffect(() => {
    playerVideo.current = null;
    setTranscriptIndex(0);
  }, [videoId]);

  useEffect(() => {
    if (focusTranscript) {
      playerVideo?.current?.loadVideoById({
        videoId: videoId,
        startSeconds: focusTranscript.startTime,
        endSeconds: focusTranscript.endTime,
      });
    }
  }, [focusTranscript, videoId]);

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
    if (event.data === YouTube.PlayerState.ENDED && focusTranscript) {
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

  const handleNext = () => {
    setTranscriptIndex((preIndex) =>
      transcript == null || transcript?.length - 1 === preIndex ? preIndex : preIndex + 1
    );
  };

  const handlePrevious = () => {
    setTranscriptIndex((preIndex) => (preIndex === 0 ? 0 : preIndex - 1));
  };

  return (
    <Card p={4} minH="100vh">
      {videoId !== '' ? (
        <>
          <YoutubeVideo
            videoId={videoId}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerChange}
          />
          <BoxAction />
          <BoxContent
            transcriptIndex={transcriptIndex}
            playRateIndex={playRateIndex}
            onNext={handleNext}
            onPrev={handlePrevious}
            onChangeRate={handleChangePlayRate}
          />
        </>
      ) : (
        <NoChoseVideo />
      )}
    </Card>
  );
};

export default LearnBox;
