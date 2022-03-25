import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';

import Like from "./components/Like";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Like />}/>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
