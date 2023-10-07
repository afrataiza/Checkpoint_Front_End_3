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
      navigate("/");
    }
  };

  return (
    <div>
      <label className="bg-red-500">Login</label>
      <div>
        <input
          type="text"
          id="username"
          name="login"
          required
          placeholder="Login"
          value={username}
          onChange={(e) => [setUsername(e.target.value), setError("")]}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>{error}</label>
        <button type="button" onClick={handleLogin}> Entrar </button>
      </div>
    </div>
  );
};

export default Login;
