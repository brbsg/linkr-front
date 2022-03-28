import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthContext";
import Signin from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp";
import Timeline from "./pages/Timeline";
<<<<<<< HEAD
import UserPosts from "./pages/UserPosts/UserPosts";
=======
import Hashtag from "./pages/Hashtag";
>>>>>>> 4cf932ef1b85dd77065826072ad636907b8063e3

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
<<<<<<< HEAD
          <Route path="/users/:id" element={<UserPosts />} />
=======
          <Route path="hashtag/:hashtag" element={<Hashtag />} />
>>>>>>> 4cf932ef1b85dd77065826072ad636907b8063e3
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
