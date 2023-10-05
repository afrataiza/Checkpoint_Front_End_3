// Login.jsx
import { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import * as C from "./styles";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username || username.length < 5 || !password) {
      setError("Verifique suas informações novamente.");
      return;
    }

    const res = await login(username, password);
    if (res) {
      setError(res);
    } else {
      navigate("/home");
    }
  };

  return (
    <C.Container>
      <C.Label>Login</C.Label>
      <C.Content>
        <Input
          type="text"
          id="username"
          name="login"
          required
          placeholder="Login"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <Input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Send" onClick={handleLogin} />
      </C.Content>
    </C.Container>
  );
};

export default Login;
