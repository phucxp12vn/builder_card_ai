import { Box } from '@chakra-ui/react';
import YouTube, { YouTubeProps } from 'react-youtube';

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

const YoutubeVideo = ({ videoId, onReady, onStateChange }: any) => {
  return (
    <Box mx="auto" w="100%" maxW="800px">
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ width: '100%' }}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </Box>
  );
};

export default YoutubeVideo;
