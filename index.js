const errors = document.querySelector(".errors");
const cronometroHtml = document.querySelector(".cronometro");
const btnStartGame = document.querySelector(".btn-start-game");

const main = document.querySelector(".main");
const containGame = document.querySelector(".contain-game");
const numbers = document.querySelector(".numbers");


const tablero = new Tablero( 3 );
const cronometro = new Cronometro();


//Inicia el juego
const iniciarJuego=()=>{
    btnStartGame.style.display = "none";
    main.style.display = "block";
    
    containGame.innerHTML = "";
    containGame.appendChild( tablero.canvas );
    tablero.dibujarTablero();
}









// window.addEventListener('resize', (e)=>{
//     const { innerWidth } = e.target;

//     if (innerWidth < 520) {
//         tablero.setSizeCanvas( 2 );
//     }
    
// })
btnStartGame.addEventListener("click", iniciarJuego );