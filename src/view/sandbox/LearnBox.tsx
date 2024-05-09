import { useMemo, useContext, useEffect, useRef, useState } from 'react';

import { Card } from '@chakra-ui/react';
import _ from 'lodash';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

import { Sentence } from '@/api/transcriptApi';
import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useGetTranscript } from '@/hook/useTranscript';

import BoxAction from './components/boxAction/BoxAction';
import BoxContent from './components/BoxContent';
import NoChoseVideo from './components/NoChoseVideo';
import YoutubeVideo from './components/YoutubeVideo';

const availablePlaybackRates = [1, 0.75, 0.5];

const LearnBox = () => {
  const { videoId } = useContext(LearnBoxContext) as LearnBoxType;
  const { data: transcript } = useGetTranscript(videoId);
  const sentences = transcript?.sentences ?? [];
  const playerVideo = useRef<YouTubePlayer | null>(null);
  const debounceRef = useRef<any | null>(null);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [focusSentence, setFocusSentence] = useState<Sentence | null>(null);
  const [playRateIndex, setPlayRateIndex] = useState(0);
  const selectedPlayRate = availablePlaybackRates[playRateIndex];

  useEffect(() => {
    if (sentences.length > 0) {
      const focusSentence = sentences[sentenceIndex];

      setFocusSentence(focusSentence);
      if (focusSentence) {
        playerVideo.current?.seekTo(focusSentence.startTime / 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(sentences), sentenceIndex, playRateIndex]);

  useEffect(() => {
    playerVideo.current = null;
    setSentenceIndex(0);
  }, [videoId]);

  const offsetTime = 200;
  const duration =
    focusSentence !== null
      ? (focusSentence.endTime - focusSentence.startTime + offsetTime) / selectedPlayRate
      : 0;

  const resetVideo = (startTime: number) => {
    console.log('duration', duration);
    if (duration) {
      playerVideo.current.seekTo(startTime);
    }
  };
  debounceRef.current = useMemo(() => {
    if (debounceRef.current) {
      debounceRef.current.cancel();
    }
    return _.debounce(resetVideo, duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handlePlayerReady: YouTubeProps['onReady'] = (event) => {
    playerVideo.current = event.target;
    focusSentence && playerVideo.current.seekTo(focusSentence.startTime / 1000);
    playerVideo.current.playVideo();
  };

  const handlePlayerChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.CUED) {
      playerVideo.current.playVideo();
    }

    if (event.data === YouTube.PlayerState.UNSTARTED && focusSentence) {
      playerVideo.current.seekTo(focusSentence.startTime / 1000);
    }

    if (event.data === YouTube.PlayerState.PLAYING && focusSentence) {
      debounceRef.current && debounceRef.current(focusSentence.startTime / 1000);
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
    setSentenceIndex((preIndex) => (sentences?.length - 1 === preIndex ? preIndex : preIndex + 1));
  };

  const handlePrevious = () => {
    setSentenceIndex((preIndex) => (preIndex === 0 ? 0 : preIndex - 1));
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
            sentenceIndex={sentenceIndex}
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
