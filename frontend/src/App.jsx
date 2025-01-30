import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  console.log("authUser", authUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
