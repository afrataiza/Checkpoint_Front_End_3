/* eslint-disable react/prop-types */

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary rounded-md font-semibold py-2 w-40">
      {text}
    </button>
  );
};

export default Button;