import { Button, Center, Stack, useDisclosure } from '@chakra-ui/react';

import TranscriptFormModal from './components/TranscriptFormModal';
import TranscriptSummaryModal from './components/TranscriptSummaryModal';
import SelectLearnVideo from '../SelectLearnVideo';

const BoxAction = () => {
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
          <SelectLearnVideo />
        </Center>
      </Stack>
      <TranscriptFormModal isOpen={isOpenAdd} onClose={onCloseAdd} />
      <TranscriptSummaryModal isOpen={isOpenSummary} onClose={onCloseSummary} />
    </>
  );
};

export default BoxAction;
