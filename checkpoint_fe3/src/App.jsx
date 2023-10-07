/* eslint-disable no-unused-vars */
import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/Auth";
import { DefaultProvider } from "./contexts/DefaultContext";
import { Footer }  from "./components/Footer";

const App = () => {
  return (
    <div className="dark:bg-zinc-900 text-neutral-700 dark:text-neutral-200">    
      <AuthProvider>
        <DefaultProvider>
          <RoutesApp />
          <Footer />
        </DefaultProvider>
      </AuthProvider>
    </div>
  )
}

export default App;