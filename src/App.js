import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
