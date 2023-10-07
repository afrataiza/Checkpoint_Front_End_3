import { createContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
 

export const DefaultContext = createContext({});

import PropTypes from 'prop-types';

export const DefaultProvider = ({ children }) => {

 const useDarkSide = () =>{
    const [theme, setTheme] = useState(localStorage.theme);
    const colorTheme = theme === "dark" ? "light" : "dark";
 
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);
 
    return [colorTheme, setTheme]
}

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
      return response.data; 
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error; 
    }
  };

  return (
    <DefaultContext.Provider value={
      {fetchDentists,
      fetchPatients,
      useDarkSide
      }
      }>
      {children}
    </DefaultContext.Provider>
  );  
}

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
