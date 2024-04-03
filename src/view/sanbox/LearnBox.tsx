import { useEffect, useRef, useState } from 'react';

import { Card } from '@chakra-ui/react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

import { Transcript } from '@/api/transcriptApi';
import { useGetTranscript, useGetVideos } from '@/hook/useTranscript';

import BoxAction from './components/BoxAction';
import BoxContent from './components/BoxContent';
import NoChoseVideo from './components/NoChoseVideo';
import YoutubeVideo from './components/YoutubeVideo';

const availablePlaybackRates = [1, 0.75, 0.5];

const LearnBox = () => {
  const [videoId, setVideoId] = useState('');
  const playerVideo = useRef<YouTubePlayer | null>(null);
  const { data: transcript } = useGetTranscript(videoId);
  const { data: videos } = useGetVideos();
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [focusTranscript, setFocusTranscript] = useState<Transcript | null>(null);
  const [repeated] = useState(true);
  const [playRateIndex, setPlayRateIndex] = useState(0);

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
          <YoutubeVideo
            videoId={videoId}
            onReady={handlePlayerReady}
            onStateChange={handlePlayerChange}
          />
          <BoxAction videoId={videoId} videos={videos} onSelect={handleSelectVideo} />
          <BoxContent
            videoId={videoId}
            transcriptIndex={transcriptIndex}
            playRateIndex={playRateIndex}
            onNext={handleNext}
            onPrev={handlePrevious}
            onChangeRate={handleChangePlayRate}
          />
        </>
      ) : (
        <NoChoseVideo videoId={videoId} videos={videos} onSelect={handleSelectVideo} />
      )}
    </Card>
  );
};

export default LearnBox;
