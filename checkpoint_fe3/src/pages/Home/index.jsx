/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";
import axios from "axios"; 
import DentistaCard from "../../components/DentistaCard";

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

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <C.Container>
      <C.Title>Dentistas Disponiveis</C.Title>
      <div>
        {dentista.map((dentista) => (
          <DentistaCard key={dentista.matricula} dentista={dentista}></DentistaCard>
        ))}
      </div>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;
