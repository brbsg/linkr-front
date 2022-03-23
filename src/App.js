import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Timeline from './pages/Timeline';

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/timeline' element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
