/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";

const Home = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Title>Home</C.Title>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;