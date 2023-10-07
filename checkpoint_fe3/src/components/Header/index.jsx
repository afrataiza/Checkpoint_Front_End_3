import { useState, useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { DefaultContext } from "../../contexts/DefaultContext";

export function Header(){ 
    const { useDarkSide } = useContext(DefaultContext);
    const [colorTheme, setColorTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    
    const toggleTheme = (checked) => {
        setColorTheme(colorTheme);
        setDarkSide(checked);
    }

    return(
        <header>
            <div>
                <img src="/dentistFavIcon.svg" alt="" />
            <h1>Odonto</h1>
            </div>
          <nav>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/">Marcar Consulta</a></li>
            <li>
                <DarkModeSwitch
                    className="dark-mode-switch"
                    checked={darkSide}
                    onChange={toggleTheme}
                    size={20}
                />
            </li>
          </nav>
          
        </header>
    )
}