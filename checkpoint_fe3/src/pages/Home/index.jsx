import { useContext } from "react";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";

const Home = () => {
  const { signout } = useContext(AuthContext);

  return (
    <C.Container>
      <C.Title>Home</C.Title>
      <Button Text="Sair" onClick={signout}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;
