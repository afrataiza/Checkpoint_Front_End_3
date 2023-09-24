/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import * as C from "./styles";

const Button = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.Button type={Type} onClick={onClick}>
      {Text}
    </C.Button>
  );
};

export default Button;