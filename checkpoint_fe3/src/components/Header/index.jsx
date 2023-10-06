import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export function Header(){ 
    const [colorTheme, setColorTheme] = useState('light');
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );
    
    const toggleTheme = (checked) => {
        if(checked){
            setColorTheme('dark');
        } else {
            setColorTheme('light');
        }
        setDarkSide(checked);
        document.documentElement.classlist.add('colorTheme');
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