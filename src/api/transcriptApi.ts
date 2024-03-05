import api from './api';

export interface TranscriptYoutube {
  text: string;
  time: number;
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
  const { data } = await api.get<TranscriptYoutube[]>(
    `http://localhost:5173/api/transcript-youtube`,
    {
      params: {
        videoId,
      },
    }
  );

  return data;
};

export const getTranscript = async (videoId: string) => {
  const { data } = await api.get<Transcript[]>(`http://localhost:5173/api/transcript-video`, {
    params: {
      videoId,
    },
  });

  return data;
};

export const addTranscript = async (transcript: TranscriptRequest) => {
  const { data } = await api.post<Transcript[]>(
    `http://localhost:5173/api/transcript-video`,
    transcript
  );

  return data;
};
