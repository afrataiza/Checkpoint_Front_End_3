import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

export const DefaultContext = createContext({});

import PropTypes from "prop-types";

export const DefaultProvider = ({ children }) => {
  const [dentistsList, setDentistsList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  const useDarkSide = () => {
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
      const root = document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
  };

  const fetchDentists = async () => {
    try {
      const response = await axios.get("https://dhodonto.ctd.academy/dentista");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dentistas:", error);
      throw error;
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("https://dhodonto.ctd.academy/paciente");
      return response.data.body;
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
      throw error;
    }
  };

  const fetchConsults = async (data) => {
    const token = JSON.parse(localStorage.getItem("user_token"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "https://dhodonto.ctd.academy/consulta",
        data,
        config
      );
      if (response.status === 200) {
        toast.success("Consulta marcada com sucesso!");
        return response.status;
      }
    } catch (error) {
      toast.error(error.response.data);
      console.error("Erro ao marcar consulta:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getDentists = async () => {
      const result = await fetchDentists();
      if (result) {
        result.shift();
        setDentistsList(result);
      }
    };
    getDentists();

    const getPatients = async () => {
      const result = await fetchPatients();
      if (result) {
        setPatientsList(result);
      }
    };

    getPatients();
  }, []);

  return (
    <DefaultContext.Provider
      value={{
        fetchDentists,
        useDarkSide,
        dentistsList,
        patientsList,
        fetchConsults,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
};

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
