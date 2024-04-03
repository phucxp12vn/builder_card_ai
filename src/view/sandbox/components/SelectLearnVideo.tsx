import { useContext } from 'react';

import { Select } from '@chakra-ui/react';

import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useGetVideos } from '@/hook/useTranscript';

const SelectLearnVideo = () => {
  const { videoId, updateVideoId } = useContext(LearnBoxContext) as LearnBoxType;
  const { data: videos } = useGetVideos();

  const handleSelectVideo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateVideoId(videos?.[e.target.selectedIndex - 1].videoId ?? '');
  };

  return (
    <Select
      placeholder="Select video"
      value={(videos ?? []).find((video) => video.videoId === videoId)?.title ?? ''}
      onChange={handleSelectVideo}
    >
      {videos?.map(({ videoId, title }) => <option key={videoId}>{title}</option>)}
    </Select>
  );
};

export default SelectLearnVideo;
