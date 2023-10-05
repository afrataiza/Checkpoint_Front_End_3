/* eslint-disable react/prop-types */
import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "../contexts/auth";

import Home from "../pages/Home";
import Login from "../pages/Login";
import { DefaultLayout } from "../layouts/defaultLayout";

const Private = ({ Item }) => {
    const { signed } = useContext(AuthContext);

  return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Fragment>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;