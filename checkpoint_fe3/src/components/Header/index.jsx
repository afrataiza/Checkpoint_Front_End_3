export function Header(){ 
    return(
        <header>
            <div>
                <img src="/dentistFavIcon.svg" alt="" />
            <h1>Odonto</h1>
            </div>
          <nav>
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/">Marcar Consulta</a></li>
            <li>
                <button>🌙</button>
            </li>
          </nav>
          
        </header>
    )
}