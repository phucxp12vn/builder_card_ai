import { useToast } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Transcript,
  TranscriptYoutube,
  Video,
  getTranscriptYoutube,
  getTranscript,
  addTranscript,
  updateTranscript,
  deleteTranscript,
  getVideos,
} from '@/api/transcriptApi';

const key = 'transcript';

export const useGetTranscriptYoutube = (videoId: string) => {
  return useQuery<TranscriptYoutube[]>({
    queryKey: [`${key}_youtube`],
    queryFn: async () => await getTranscriptYoutube(videoId),
  });
};

export const useGetTranscript = (videoId: string) => {
  return useQuery<Transcript[]>({
    queryKey: [`${key}_${videoId}`],
    queryFn: async () => await getTranscript(videoId),
  });
};

export const useAddTranscript = (formik: any, videoId: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTranscript,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${key}_${videoId}`] });

      toast({
        title: 'Sentence added.',
        description: "We've added new transcript sentence.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      formik?.resetForm();
    },
  });
};

export const useUpdateTranscript = (videoId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: updateTranscript,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${key}_${videoId}`] });

      toast({
        title: 'Sentence updated.',
        description: "We've updated the transcript sentence.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

export const useDeleteTranscript = (videoId: string) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: deleteTranscript,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${key}_${videoId}`] });

      toast({
        title: 'Sentence deleted.',
        description: "We've deleted the transcript sentence.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });
};

export const useGetVideos = () => {
  return useQuery<Video[]>({
    queryKey: [`video`],
    queryFn: getVideos,
  });
};
