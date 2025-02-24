
class Cronometro {

    times;

    iniciarCronometro() {
        cronometroHtml.style.display = "block";
        time = setInterval(() => {
            segundo++;
            if(segundo == 60){
                minuto++;
                segundo = 0;
                if(minuto < 10) minuto = "0"+minuto;
                if(minuto == 60)clearInterval(time);
            }
            if(segundo < 10) segundo = "0"+segundo;
            cronometroHtml.textContent = `${minuto}:${segundo}`;
        }, 1000);
    }
}