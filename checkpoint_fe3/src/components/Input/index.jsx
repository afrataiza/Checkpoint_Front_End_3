/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="w-4/5 h-8 rounded-md p-2 border-2 border-zinc-400 bg-transparent focus:outline-none focus:border-zinc-500"
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;