import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Signin from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp";
import Timeline from "./pages/Timeline";
import UserPosts from "./pages/UserPosts/UserPosts";
import Hashtag from "./pages/Hashtag";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/users/:id" element={<UserPosts />} />
          <Route path="/hashtag/:hashtag" element={<Hashtag />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
