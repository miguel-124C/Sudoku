let matrizGame = [];
let matrizResultado = [];
let time;
let segundo = "00";
let minuto = "00";
let numErrors = 0;
const errors = document.querySelector(".errors");
const cronometro = document.querySelector(".cronometro");
const btnStartGame = document.querySelector(".btn-start-game");
let numberSelect = null;

const main = document.querySelector(".main");
const containGame = document.querySelector(".contain-game");
const numbers = document.querySelector(".numbers");

const setValores=()=>{
    matrizGame = [];
    matrizResultado = [];
    segundo = "00";
    minuto = "00";
    numErrors = 0;
    numberSelect = null;
}

//Inicia el juego
const iniciarJuego=()=>{
    containGame.innerHTML = "";
    main.lastElementChild.innerHTML = "";
    mostrarTablero();
    armarMatrizResultado();
    mostrarPistas();
    iniciarCronometro();
}
btnStartGame.addEventListener("click",()=>{
    btnStartGame.style.display = "none";
    main.style.display = "block";
    iniciarJuego();
});
const lightRowColumRegionNumber=(i,j,num)=>{
    for (const square of containGame.children) {
        if(square.classList.item(3) || square.classList.item(4))
            square.classList.remove("colorFilaColumna","colorNumRepetido","colorRegion"); 
    }
    for (const square of containGame.children) {
        if(square.classList.item(1)[0] == i || square.classList.item(1)[1] == j)
            square.classList.add("colorFilaColumna");
        if(square.textContent == num)            
            square.classList.add("colorNumRepetido");
        let x = getRegion(i,j)[0];
        let y = getRegion(i,j)[1];   
        for (let i = x-3; i < x; i++) 
        for (let j = y-3; j < y; j++)
            if(square.classList.item(1) == `${i}${j}`)
            square.classList.add("colorRegion"); 
    }
}
const mostrarTablero=()=>{
    errors.textContent = numErrors;
    //Crea los elementos de la matriz
    for (let i = 0; i < 9; i++) {
        matrizGame[i] = new Array(9);
        matrizResultado[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            const square = document.createElement("div");
            square.classList.add("square",`${i}${j}`,`${getRegion(i,j)[2]}`);
            square.addEventListener("click",()=>{
                if(square.textContent == "" ){
                    if(numberSelect == matrizGame[i][j]){
                        square.textContent = numberSelect;
                        numberSelect = null;
                        if(win())alert("ganaste");
                    }else if(numberSelect != null){
                        numErrors++;
                        errors.textContent = numErrors;
                    }
                }
                lightRowColumRegionNumber(i,j,parseInt(square.textContent));
                lose();
            });
            containGame.appendChild(square);
        }
    }
    //Coloca numeros del 1 al 9 para apretar y colocar en la matriz
    for (let i = 1; i < 10; i++) {
        const number = document.createElement("div");
        number.textContent = i;
        number.addEventListener("click",()=>numberSelect = number.textContent);
        numbers.appendChild(number);
    }
}
const armarMatrizResultado=()=>{
    for (let i = 0; i < 9; i++) {
        let contador = 0;
        do{
            delColumn(0,i,9,i+1);
            contador++;
            if(contador >= 9){
                i--;
                delColumn(0,i,9,i+1);
                contador = 0;
            }
        }while(dibujarRegion(0,i,9,i+1) == false);    
    }
    igualarMatrices();       
} 
const mostrarPistas=()=>{
    let ind = 0;
    do{ 
        let i = Math.floor(Math.random()*8)+1;
        let j = Math.floor(Math.random()*8)+1;
        const square = document.querySelectorAll(".square");
        square.forEach(a=>{
            if(a.classList.item(1) == `${i}${j}`){
                if(a.textContent == ""){
                    a.textContent = matrizResultado[i][j];
                    ind++;
                }
            }            
        })
    }while(ind < 38);
}
//devuelve la region de donde se encuentre el numero en la matriz
//devuelve una matriz [maximoNumeroDeFilasDeI,maximoNumeroDeFilasDeJ,StringIndicaLaRegion]
const getRegion=(i,j)=>{
    if(i<3 && j<3) return [3,3,"R1"];
    if(i<3 && (j>2&&j<6)) return [3,6,"R2"];
    if(i<3 && (j>5&&j<9))return [3,9,"R3"];
    if((i>2 && i<6)&&j<3)return [6,3,"R4"];
    if((i>2 && i<6) && (j>2&&j<6))return [6,6,"R5"];
    if((i>2 && i<6) && (j>5&&j<9))return [6,9,"R6"];
    if((i>5 && i<9)&&j<3)return [9,3,"R7"];
    if((i>5 && i<9)&&(j>2&&j<6))return [9,6,"R8"];
    if((i>5 && i<9) && (j>5&&j<9))return [9,9,"R9"];
}
//Verifica si algun numero de una region esta repetido, si esta repetido devuelve false
const numRepetidoRegion=(x,y,maxx,maxy,matriz,number)=>{
    for (let i = x; i < maxx; i++) 
        for (let j = y; j < maxy; j++)
            if(matriz[i][j] == number) return false;

    return true;
}
//verifica si el numero que se ingresara en una posicion ya esta colocado en toda la fila y columna donde se encuentre
const numRepetido=(indice,number,matriz)=>{
    for (let x = 0; x < 9; x++)
    if(matriz[indice[0]][x] == number) return false

    for (let x = 0; x < 9; x++)
    if(matriz[x][indice[1]] == number) return false

    return true;
}
//Iguala las matrices
const igualarMatrices=()=>{
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            matrizGame[i][j] = matrizResultado[i][j];
}
const dibujarRegion=(x,y,maxx,maxy)=>{
    for (let i = x; i < maxx; i++) {
        for (let j = y; j < maxy; j++) { 
            let a;
            let c = 0;
            do {
                a = false;
                let num = Math.floor(Math.random()*9)+1;
                let indiceI = getRegion(i,j)[0];
                let indiceY = getRegion(i,j)[1];
                if(numRepetidoRegion(indiceI-3,indiceY-3,indiceI,indiceY,matrizResultado,num)){ 
                    if(numRepetido([i,j],num,matrizResultado)){
                        matrizResultado[i][j]=num;
                        a=true;
                    }
                }
                c++;
            } while (a == false && c < 300);
        }
    }
    return comprobarColumnaLlena(x,y,maxx,maxy);
}
const comprobarColumnaLlena=(x,y,maxx,maxy)=>{
    for (let i = x; i < maxx; i++)
        for (let j = y; j < maxy; j++)
            if(matrizResultado[i][j] == null)return false;
    return true;
}
const delColumn=(x,y,maxx,maxy)=>{
    for (let i = x; i < maxx; i++)
        for (let j = y; j < maxy; j++)
            matrizResultado[i][j] = null;
}
function iniciarCronometro() {
    cronometro.style.display = "block";
    time = setInterval(() => {
        segundo++;
        if(segundo == 60){
            minuto++;
            segundo = 0;
            if(minuto < 10) minuto = "0"+minuto;
            if(minuto == 60)clearInterval(time);
        }
        if(segundo < 10) segundo = "0"+segundo;
        cronometro.textContent = `${minuto}:${segundo}`;
    }, 1000);
}
const win=()=>{
    for (const square of containGame.children) {
        if(square.textContent == "")return false;
    }
    return true;
}
const lose=()=>{
    if(numErrors == 3){ 
        alert("perdiste");
        clearInterval(time);
        containGame.innerHTML = `
            <div class="messageLoser">
                <div>
                    Perdiste: sobrepaso de intentos
                </div>
                <div>
                    Tiempo transcurrido: ${minuto}:${segundo}
                </div>
                <button class="btn-againGame">Volver a jugar</button>
            </div>
        `;
        document.querySelector(".btn-againGame").addEventListener("click",()=>{
            setValores();
            iniciarJuego();
        });   
    }     
}