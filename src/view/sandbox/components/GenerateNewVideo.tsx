import { useContext, useState } from 'react';

import { Button, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';
import { TfiYoutube } from 'react-icons/tfi';

import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useGenerateTranscript } from '@/hook/useTranscript';
import { extractYouTubeVideoId } from '@/view/tool/utils';

const GenerateNewVideo = () => {
  const { updateVideoId } = useContext(LearnBoxContext) as LearnBoxType;
  const { mutate: generateTranscript, isPending } = useGenerateTranscript();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const extractedVideoId = extractYouTubeVideoId(youtubeUrl);

  const handleClickGenerate = () => {
    extractedVideoId &&
      generateTranscript(extractedVideoId, {
        onSuccess: () => {
          updateVideoId(extractedVideoId);
        },
      });
  };

  const handleChangeInputUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setYoutubeUrl(value);
  };

  return (
    <Stack direction="row">
      <InputGroup w={'80%'}>
        <InputLeftAddon>
          <TfiYoutube size={24} color="gray.300" />
        </InputLeftAddon>
        <Input
          placeholder="Input new link youtube video"
          value={youtubeUrl}
          onChange={handleChangeInputUrl}
        />
      </InputGroup>
      <Button
        size="md"
        variant="solid"
        colorScheme="blue"
        isLoading={isPending}
        loadingText="Submitting"
        onClick={handleClickGenerate}
        isDisabled={extractedVideoId == null}
      >
        Generate
      </Button>
    </Stack>
  );
};

export default GenerateNewVideo;
