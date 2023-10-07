import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { DefaultContext } from "../../contexts/DefaultContext";
import { AuthContext } from "../../contexts/Auth";

export function Header() {
  const { useDarkSide } = useContext(DefaultContext);
  const [colorTheme, setColorTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const { signout, signed } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  const toggleTheme = (checked) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <header className="w-screen h-24 flex justify-between pl-8 pr-20 items-center shadow-md">
      <div className="flex justify-center items-center gap-2 h-full">
        <img src="/dentistFavIcon.png" alt="logo" className="w-12 h-12" />
        <h2 className="text-accent font-bold text-xl">HAP ODONTO</h2>
      </div>
      <nav>
        <ul className="flex justify-end gap-24 text-lg h-full items-center">
          <li className="hover:text-accent-focus">
            <Link to="/">Home</Link>
          </li>
          <li className={signed ? "hidden" : "hover:text-accent-focus"}>
            <Link to="/login">Login</Link>
          </li>
          <li className={signed ? "hover:text-accent-focus" : "hidden"}>
            <button type="button" onClick={handleLogout}>Sair</button>
          </li>
          <li>
            <DarkModeSwitch
              className="dark-mode-switch"
              checked={darkSide}
              onChange={toggleTheme}
              size={20}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
