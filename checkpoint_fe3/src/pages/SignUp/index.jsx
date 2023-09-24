/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./style";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!email || !emailConf || !password) {
      setError("All the fields must be filled");
      return;
    } else if (email !== emailConf) {
      setError("The e-mails don't match");
      return;
    }

    try {
      const res = await signup(email, password);
      if (res) {
        setError(res);
      } else {
        alert("User registered with success!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Error during signup");
    }
  };

  return (
    <C.Container>
      <C.Label>Sign Up</C.Label>
      <C.Content>
        <Input 
          type="email"
          placeholder="Type your email"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirm your e-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Type your password"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Sign Up" onClick={handleSignup} />
        <C.LabelSignin>
          Already have an account?
          <C.Strong>
            <Link to="/">&nbsp;Login</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
