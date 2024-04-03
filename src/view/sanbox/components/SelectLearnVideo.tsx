import { Select } from '@chakra-ui/react';

import { Video } from '@/api/transcriptApi';

const SelectLearnVideo = ({
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

export default SelectLearnVideo;
