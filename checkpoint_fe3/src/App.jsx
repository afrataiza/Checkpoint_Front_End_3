/* eslint-disable no-unused-vars */
import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./globalStyle/global";
import { Header }  from "./components/Header";
import { Footer }  from "./components/Footer";

const App = () => {
  return (
    <div className="dark:bg-gray-800">    
      <AuthProvider>
        <Header />
        <RoutesApp />
        <GlobalStyle />
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default App;