import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/Auth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Header }  from "../components/Header";
import DentistDetails from "../pages/DentistDetails";

const RoutesApp = () => {
    return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dentist/:id" element={<DentistDetails />} />
          <Route path="*" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;
