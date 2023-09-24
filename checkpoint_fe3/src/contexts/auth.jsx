/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios"; 

export const AuthContext = createContext({});

export const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  const login = async (email, password) => {
    
    if (!emailRegex.test(email)) {
      return "Invalid e-mail";
    }

    if (!passwordRegex.test(password)) {
      return "Weak password";
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
      } else {
        return "Incorrect e-mail or password";
      }
    } else {
      return "The user isn't registered";
    }
  };

  const signup = async (email, password) => {
   
    if (!emailRegex.test(email)) {
      return "Invalid e-mail";
    }

    if (!passwordRegex.test(password)) {
      return "Weak password";
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "An account with this e-mail is already in use";
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
      console.error("Error fetching dentists:", error);
      throw error; 
    }
  };

 
  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://dhodonto.ctd.academy/paciente");
      return response.data; 
    } catch (error) {
      console.error("Error fetching patients:", error);
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
