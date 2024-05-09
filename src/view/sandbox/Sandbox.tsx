import LearnBoxProvider from '@/contexts/LearnBoxContext';

import LearnBox from './LearnBox';

const Sandbox = () => {
  return (
    <LearnBoxProvider>
      <LearnBox />
    </LearnBoxProvider>
  );
};

export default Sandbox;
