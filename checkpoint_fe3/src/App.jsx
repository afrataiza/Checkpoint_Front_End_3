/* eslint-disable no-unused-vars */
import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { DefaultProvider } from "./contexts/DefaultContext";
import { Header }  from "./components/Header";
import { Footer }  from "./components/Footer";

const App = () => {
  return (
    <div className="dark:bg-gray-800">    
      <AuthProvider>
        <DefaultProvider>
          <Header />
          <RoutesApp />
          <Footer />
        </DefaultProvider>
      </AuthProvider>
    </div>
  )
}

export default App;