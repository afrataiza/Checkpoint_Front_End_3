import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/auth";
import Home from "../pages/Home";
import Login from "../pages/Login";

const RoutesApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} index />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;
