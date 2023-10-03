/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const login = async (username, password) => {
    if (username.length <= 5) {
      return "Verifique suas informações novamente.";
    }

    if (!password) {
      return "Por favor digite uma senha.";
    }

    if (!passwordRegex.test(password)) {
      return "Senha fraca, verifique suas informações.";
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.username === username);

    if (hasUser?.length) {
      if (hasUser[0].username === username && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ username, token }));
        setUser({ username, password });
      } else {
        return "Nome de usuário ou senha incorretos";
      }
    } else {
      return "O usuário não está registrado.";
    }
  };

  const signup = async (email, password) => {
    if (!passwordRegex.test(password)) {
      return "A senha é muito fraca.";
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Esse usuário já existe.";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const fetchDentists = async () => {
    try {
      const response = await axios.get("https://dhodonto.ctd.academy/dentista");
      return response.data;
    } catch (error) {
      console.error("Erro procurando dentistas:", error);
      throw error;
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://dhodonto.ctd.academy/paciente");
      return response.data;
    } catch (error) {
      console.error("Erro buscando pacientes:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        login,
        signup,
        signout,
        fetchDentists,
        fetchPatients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
