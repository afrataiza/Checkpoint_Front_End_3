import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Header }  from "../components/Header";

const RoutesApp = () => {
    return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;
