import './App.css';

import { AppProvider } from '@/provider/app';
import { AppRoutes } from '@/routes';

const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);

export default App;
