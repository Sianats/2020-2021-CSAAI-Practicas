display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
operacion = document.getElementsByClassName ("operador")
digitos = document.getElementsByClassName("digito")

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
}

let estado = ESTADO.INIT; 

function digito(ev){
  if (estado == ESTADO.INIT){
    display.innerHTML += ev.target.value;
    estado = ESTADO.OP1;
  } else if (estado == ESTADO.OP1){
    display.innerHTML += ev.target.value;
    estado = ESTADO.OPERATION;
  } else if (estado == ESTADO.OPERATION){
    display.innerHTML += ev.target.value;
    estado = ESTADO.OP2;
  } else if (estado == ESTADO.OP2){
    display.innerHTML += ev.target.value;
  }
}

for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev) => {
    if (display.innerHTML == "0") {
      display.innerHTML = ev.target.value;
    }else if (estado == ESTADO.OPERATION){
      display.innerHTML = ev.target.value;
      estado = ESTADO.OP2;
    } else {
      display.innerHTML += ev.target.value;
    }
  }
}

for (let boton of digitos) {
  boton.onclick = digito;
}

igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

borrar.onclick = () => {
  if (display.innerHTML.length == 1){
    display.innerHTML = "0";
    estado = ESTADO.INIT;
  } else {
    display.innerHTML = display.innerHTML.slice(0,-1);
  }
}

clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
}