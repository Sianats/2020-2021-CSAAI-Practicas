display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
operador = document.getElementById("operacion")
resta = document.getElementById ("resta")
multiplicar = document.getElementById ("multiplicar")
dividir = document.getElementById ("dividir")
signo = document.getElementById ("signo")
digitos = document.getElementsByClassName("digito")

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
}

let estado = ESTADO.INIT; 

// Creo esta función para todos los digitos generales y no tener que declararlos uno por uno
function digito(ev){
  if (estado == ESTADO.INIT) {
    display.innerHTML = ev.target.value;
    estado = ESTADO.OP1;
  } else{
    display.innerHTML += ev.target.value;
}
}


for (let boton of digitos) {
  boton.onclick = digito;
}

suma.onclick = (ev) => {
  display.innerHTML += ev.target.value;
}

resta.onclick = (ev) => {
  display.innerHTML += ev.target.value;
}

multiplicar.onclick = (ev) => {
  display.innerHTML += ev.target.value;
}

dividir.onclick = (ev) => {
  display.innerHTML += ev.target.value;
}

igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

borrar.onclick = () => {
  if (display.innerHTML == "0"){
    display.innerHTML = "0";
  } else {
    display.innerHTML = display.innerHTML.slice(0,-1);
  }
}

clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}