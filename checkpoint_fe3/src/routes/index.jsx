import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/auth";
import Home from "../pages/Home";
import Login from "../pages/Login";

const RoutesApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;
