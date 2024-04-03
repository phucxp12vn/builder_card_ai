import React, { useContext, useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import { Transcript } from '@/api/transcriptApi';
import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useGetTranscript, useUpdateTranscript, useDeleteTranscript } from '@/hook/useTranscript';

function ConfirmDialog({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete transcript</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to delete this transcript.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const TranscriptSummary = ({ videoId }: any) => {
  const { data: transcript } = useGetTranscript(videoId);
  const { mutate: updateTranscript } = useUpdateTranscript(videoId);
  const { mutate: deleteTranscript } = useDeleteTranscript(videoId);
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleUpdateTranscript = (newTranscript: Transcript) => {
    updateTranscript(newTranscript);
  };

  const handleDeleteTranscript = (id: string) => {
    setSelectedItemId(id);
    onOpenConfirm();
  };

  const handleConfirmDelete = () => {
    selectedItemId && deleteTranscript(selectedItemId);
    onCloseConfirm();
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Content</Th>
              <Th isNumeric>Start Time</Th>
              <Th isNumeric>End Time</Th>
              <Th>Notes</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {transcript?.map(({ id, content, startTime, endTime, notes }: Transcript) => (
              <Tr key={id}>
                <Td>
                  <Editable
                    defaultValue={content}
                    fontSize="2xl"
                    onSubmit={(value: string) =>
                      handleUpdateTranscript({
                        id,
                        content: value,
                        startTime,
                        endTime,
                        notes,
                      })
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    defaultValue={startTime.toString()}
                    fontSize="2xl"
                    onSubmit={(value: string) =>
                      handleUpdateTranscript({
                        id,
                        content,
                        startTime: +value,
                        endTime,
                        notes,
                      })
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    defaultValue={endTime.toString()}
                    fontSize="2xl"
                    onSubmit={(value: string) =>
                      handleUpdateTranscript({
                        id,
                        content,
                        startTime,
                        endTime: +value,
                        notes,
                      })
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>{notes}</Td>
                <Td>
                  <IconButton
                    aria-label="delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteTranscript(id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmDialog
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        onDelete={handleConfirmDelete}
      />
    </>
  );
};

const TranscriptSummaryModal = ({ isOpen, onClose }: any) => {
  const { videoId } = useContext(LearnBoxContext) as LearnBoxType;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TranscriptSummary videoId={videoId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TranscriptSummaryModal;
