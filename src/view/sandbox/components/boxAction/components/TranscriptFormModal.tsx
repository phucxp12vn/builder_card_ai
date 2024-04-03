import { useContext } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
  Stack,
  Box,
  StackDivider,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { LearnBoxContext, LearnBoxType } from '@/contexts/LearnBoxContext';
import { useAddTranscript } from '@/hook/useTranscript';

import TranscriptYoutube from './TranscriptYoutube';

const TranscriptForm = ({ formik }: { formik: any }) => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';

  return (
    <Box minW="50%">
      <Text color={textColorSecondary} fontSize="md" me="26px">
        Please add sentence content transcript base on transcript of youtube
      </Text>
      <FormControl isInvalid={Boolean(formik.errors.content) && formik.touched.content}>
        <FormLabel color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
          Content
        </FormLabel>
        <Input
          id="content"
          name={'content'}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Please input the content"
        />
        <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(formik.errors.startTime) && formik.touched.startTime}>
        <FormLabel color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
          Start Time (s)
        </FormLabel>
        <Input
          id="startTime"
          name={'startTime'}
          value={formik.values.startTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Please input startTime play of sentence"
          type="number"
        />
        <FormErrorMessage>{formik.errors.startTime}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(formik.errors.endTime) && formik.touched.endTime}>
        <FormLabel color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
          End Time (s)
        </FormLabel>
        <Input
          id="endTime"
          name={'endTime'}
          value={formik.values.endTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Please input endTime play of sentence"
          type="number"
        />
        <FormErrorMessage>{formik.errors.endTime}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel color={textColorPrimary} fontWeight="500" fontSize="md" mb="4px">
          Notes
        </FormLabel>
        <Textarea
          id="notes"
          name={'notes'}
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Please input the notes"
        />
      </FormControl>
    </Box>
  );
};

const TranscriptFormModal = ({ isOpen, onClose }: any) => {
  const { videoId } = useContext(LearnBoxContext) as LearnBoxType;

  const formik = useFormik({
    initialValues: {
      content: '',
      startTime: 0,
      endTime: 0,
      notes: '',
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Please input content.'),
      startTime: Yup.number()
        .required('Please startTime of sentence in video.')
        .min(0, 'Please input start from 0'),
    }),
    onSubmit: ({ content, startTime, endTime, notes }) => {
      mutate({ content: content, startTime, endTime, notes, videoId });
    },
  });

  const { mutate, isPending } = useAddTranscript(formik, videoId);

  const textColorSecondary = 'gray.400';

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add transcript</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack
            direction="row"
            maxH={'80vh'}
            divider={<StackDivider borderColor={textColorSecondary} />}
          >
            <TranscriptForm formik={formik} />
            <TranscriptYoutube videoId={videoId} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="solid"
            fontWeight="500"
            colorScheme="blue"
            isLoading={isPending}
            loadingText="Adding..."
            type="submit"
            mr={3}
            onClick={formik.submitForm}
          >
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TranscriptFormModal;
