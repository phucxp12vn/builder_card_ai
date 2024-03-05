import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  Transcript,
  TranscriptYoutube,
  getTranscriptYoutube,
  getTranscript,
  addTranscript,
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
    queryKey: [`${key}`],
    queryFn: async () => await getTranscript(videoId),
  });
};

export const useAddTranscript = (formik: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTranscript,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${key}`] });

      formik?.clearForm();
    },
  });
};
