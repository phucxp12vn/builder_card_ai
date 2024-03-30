import api from './api';

export interface TranscriptYoutube {
  text: string;
  time: number;
}

export interface Video {
  videoId: string;
  title: string;
}

export interface Transcript {
  id: string;
  content: string;
  startTime: number;
  endTime: number;
  notes: string;
}

type TranscriptRequest = Omit<Transcript, 'id'> & { videoId: string };

export const getTranscriptYoutube = async (videoId: string) => {
  const { data } = await api.get<TranscriptYoutube[]>(`/api/transcript-youtube`, {
    params: {
      videoId,
    },
  });

  return data;
};

export const getTranscript = async (videoId: string) => {
  const { data } = await api.get<Transcript[]>(`/api/transcript-video`, {
    params: {
      videoId,
    },
  });

  return data;
};

export const addTranscript = async (transcript: TranscriptRequest) => {
  const { data } = await api.post<Transcript[]>(`/api/transcript-video`, transcript);

  return data;
};

export const updateTranscript = async (transcript: Transcript) => {
  const { data } = await api.put<Transcript[]>(`/api/transcript-video`, transcript);

  return data;
};

export const deleteTranscript = async (id: string) => {
  const { data } = await api.delete<Transcript[]>(`/api/transcript-video`, {
    params: {
      id,
    },
  });

  return data;
};

export const getVideos = async () => {
  const { data } = await api.get<Video[]>(`/api/video`, {});

  return data;
};
