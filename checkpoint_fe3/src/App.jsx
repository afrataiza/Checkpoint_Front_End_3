/* eslint-disable no-unused-vars */
import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DefaultProvider } from "./contexts/DefaultContext";
import { Footer }  from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="dark:bg-base-100 text-neutral-700 dark:text-neutral-200 overflow-x-hidden">    
      <AuthProvider>
        <DefaultProvider>
          <Toaster />
          <RoutesApp />
          <Footer />
        </DefaultProvider>
      </AuthProvider>
    </div>
  )
}

export default App;