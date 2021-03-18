display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")

const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2_INIT: 3,
    OP2: 4,
}

let estado = ESTADO.INIT; 

function digito(ev){
    if (estado == ESTADO.INIT) {
        display.innerHTML = ev.target.value;
        estado = ESTADO.OP1;
    } else {
        display.innerHTML += ev.target.value;
    } 
    
}


digitos = document.getElementsByClassName("digito")

for (let boton of digitos) {
    boton.onclick = digito;
}

suma.onclick = (ev) => {
  display.innerHTML += ev.target.value;
}

igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}