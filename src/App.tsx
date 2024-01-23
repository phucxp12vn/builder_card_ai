import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout.tsx";
import BuildCard from "./view/tool/BuildCard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BuildCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
