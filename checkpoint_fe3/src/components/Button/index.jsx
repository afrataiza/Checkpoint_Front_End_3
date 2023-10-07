/* eslint-disable react/prop-types */

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="bg-primary rounded-md font-semibold px-8 py-2">
      {text}
    </button>
  );
};

export default Button;