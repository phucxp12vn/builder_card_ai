import { useState, createContext } from 'react';

export interface LearnBoxType {
  videoId: string;
  updateVideoId: (videoId: string) => void;
}

export const LearnBoxContext = createContext<LearnBoxType | null>(null);

const LearnBoxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videoId, setVideoId] = useState('');

  const updateVideoId = (newVideoId: string) => {
    setVideoId(newVideoId);
  };

  return (
    <LearnBoxContext.Provider value={{ videoId, updateVideoId }}>
      {children}
    </LearnBoxContext.Provider>
  );
};

export default LearnBoxProvider;
