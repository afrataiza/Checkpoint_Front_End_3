import  { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth"; 

const Login = () => {
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!user || user.length < 5) {
      setError("Verifique suas informações novamente.");
      return;
    }

    if (!password) {
      setError("Por favor digite uma senha");
      return;
    }

    try {
      const res = await login(user, password);
      if (res) {
        setError(res);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setError("Erro durante o login");
    }
  };

  return (
    <C.Container>
      <C.Label>Login</C.Label>
      <C.Content>
        <Input
          type="user"
          placeholder="Login"
          value={user}
          onChange={(e) => [setUser(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Send" onClick={handleLogin} />
        {/* <C.LabelSignup>
          Not registered?
          <C.Strong>
            <Link to="/signup">&nbsp;Sign up</Link>
          </C.Strong>
        </C.LabelSignup> */}
      </C.Content>
    </C.Container>
  );
};

export default Login;
