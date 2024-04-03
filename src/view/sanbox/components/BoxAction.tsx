import { Button, Center, Stack, useDisclosure } from '@chakra-ui/react';

import SelectLearnVideo from './SelectLearnVideo';
import TranscriptFormModal from './TranscriptFormModal';
import TranscriptSummaryModal from './TranscriptSummaryModal';

const BoxAction = ({ videoId, videos, onSelect }: any) => {
  const { isOpen: isOpenSummary, onOpen: onOpenSummary, onClose: onCloseSummary } = useDisclosure();
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();

  return (
    <>
      <Stack direction={{ sm: 'column', md: 'row' }} my={4}>
        <Button onClick={onOpenAdd} my={{ sm: 0, md: 4 }}>
          Add new transcript
        </Button>
        <Button onClick={onOpenSummary} my={{ sm: 0, md: 4 }}>
          Transcript summary
        </Button>
        <Center w={{ sm: '100%', md: '200px' }}>
          <SelectLearnVideo videoId={videoId} videos={videos ?? []} onSelect={onSelect} />
        </Center>
      </Stack>
      <TranscriptFormModal videoId={videoId} isOpen={isOpenAdd} onClose={onCloseAdd} />
      <TranscriptSummaryModal videoId={videoId} isOpen={isOpenSummary} onClose={onCloseSummary} />
    </>
  );
};

export default BoxAction;
