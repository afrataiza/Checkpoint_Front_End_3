/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";
import axios from "axios"; 
import DentistaCard from "../../components/DentistaCard"

const Home = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dentista, setDentista] = useState([]);

  useEffect(() => { 
    axios.get("https://dhodonto.ctd.academy/dentista")
    .then((response) => {
      setDentista(response.data); 
    }).catch((error) => {
      console.error("Erro ao buscar dentista ", error); 
    });
  }, []);

  return (
    <C.Container>
      <C.Title>Home</C.Title>
      <h2>Dentistas Disponiveis</h2>
      <div>
        {dentista.map((dentista) => (
          <DentistaCard key={dentista.matricula} dentista={dentista}></DentistaCard>
        ))}
      </div>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
        
              
    
      {/*Cada dentista deve conter name e username, juntamente com um link que permite navegar para a página dentist/:id com base no id do dentista.*/}
    </C.Container>
  );
};

export default Home;