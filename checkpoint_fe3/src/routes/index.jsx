/* eslint-disable react/prop-types */
import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "../contexts/auth";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SignUp";

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
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default RoutesApp;