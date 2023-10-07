import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
     setSigned(true);
    }
  }, []);

  const login = async (username, password) => {
    if (username.length <= 5 || !password) {
      return "Verifique suas informações novamente.";
    }

    try {
      const response = await axios.post(
        "https://dhodonto.ctd.academy/auth",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem(
          "user_token",
          JSON.stringify(token)
        );
        setSigned(true);
        return null;
      } else {
        return "Nome de usuário ou senha incorretos";
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      return "Erro durante o login";
    }
  };

  const signout = () => {
    localStorage.removeItem("user_token");
    setSigned(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        login,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
