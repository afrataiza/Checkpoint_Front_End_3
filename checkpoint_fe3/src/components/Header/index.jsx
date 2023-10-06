export function Header(){ 
    return(
        <header>
            <div className="">
                <img src="/dentistFavIcon.svg" alt="" />
            <h1>Odonto</h1>
            </div>
          <nav>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/">Marcar Consulta</a></li>
            <li>
                <button>🌙</button>
            </li>
          </nav>
          
        </header>
    )
}