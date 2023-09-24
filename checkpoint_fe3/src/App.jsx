/* eslint-disable no-unused-vars */
import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./globalStyle/global";

const App = () => (
  <AuthProvider>
    <RoutesApp />
    <GlobalStyle />
  </AuthProvider>
);

export default App;