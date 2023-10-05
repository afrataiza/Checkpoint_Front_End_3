import { useContext } from "react";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  return (
    <C.Container>
      <C.Title>Home</C.Title>
      <Button Text="Logout" onClick={handleLogout}>
        Sair
      </Button>
    </C.Container>
  );
};

export default Home;
