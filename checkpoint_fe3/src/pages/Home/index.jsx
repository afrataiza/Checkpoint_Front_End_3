/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { DefaultContext } from "../../contexts/DefaultContext";
import DentistaCard from "../../components/DentistaCard";

const Home = () => {
  
  const { fetchDentists } = useContext(DefaultContext);
  const [dentists, setDentists] = useState([]);

  useEffect(() => { 
    const getDentists = async () => {
      const result = await fetchDentists();
      if (result) {
        result.shift();
        setDentists(result);
      }
    };
    getDentists();
    
  }, [fetchDentists]);

  
  return (
    <div className="w-screen min-h-screen flex flex-col gap-12 pt-16">
      <h1 className="w-full text-center text-3xl font-bold">Dentistas Disponiveis</h1>
      <div className="flex flex-wrap gap-8 w-full justify-between px-12">
        {dentists.map((dentist) => (
          <DentistaCard key={dentist.matricula} dentist={dentist}></DentistaCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
