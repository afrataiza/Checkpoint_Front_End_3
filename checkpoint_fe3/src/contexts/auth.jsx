import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState();
  const [axiosInstance, setAxiosInstance] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      setUsername(JSON.parse(userToken));
      const token = JSON.parse(userToken).token;
      const instance = axios.create({
        baseURL: "https://dhodonto.ctd.academy",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAxiosInstance(instance);
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
          JSON.stringify({ username, token })
        );
        setUsername({ username });
        const instance = axios.create({
          baseURL: "https://dhodonto.ctd.academy",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAxiosInstance(instance);
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
    setUsername(null);
    setAxiosInstance(null);
  };


  const fetchDentists = async (id) => {
    try {
      const response = await axiosInstance.get(`/dentista?matricula=${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro procurando dentistas:", error);
      throw error;
    }
  };
  

  const fetchPatients = async () => {
    try {
      const response = await axiosInstance.get("/paciente");
      return response.data;
    } catch (error) {
      console.error("Erro buscando pacientes:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        signed: !!username,
        login,
        signout,
        fetchDentists,
        fetchPatients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
