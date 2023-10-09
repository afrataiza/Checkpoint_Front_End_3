// Login.jsx
import { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

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
    <div className="w-screen min-h-screen flex pt-16 items-center flex-col gap-12">
      <h2 className="font-semibold text-2xl">Login</h2>
      <div className=" dark:bg-base-content w-96 h-56 rounded-xl flex flex-col items-center justify-center gap-4 shadow-md">
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
        <label className="text-red-500 text-sm">{error}</label>
        <Button text='Entrar' onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
