/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, emailRegex, passwordRegex } from "../../contexts/auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // if (!emailRegex.test(email)) {
    //     setError("E-mail inválido");
    //     return;
    //   }

    if (!email || email.length < 5) {
      setError("Login information is too short");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Weak password");
      return;
    }

    if (!email || !password) {
      setError("Re-check your information and try again");
      return;
    }

    try {
      const res = await login(email, password);
      if (res) {
        setError(res);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login");
    }
  };

  return (
    <C.Container>
      <C.Label>Login</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Login"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Send" onClick={handleLogin} />
        <C.LabelSignup>
          Not registered?
          <C.Strong>
            <Link to="/signup">&nbsp;Sign up</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Login;
