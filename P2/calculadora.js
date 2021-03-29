display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
operacion = document.getElementsByClassName ("operador")
digitos = document.getElementsByClassName("digito")
punto = document.getElementById("punto")

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  punto: false,
}

let estado = ESTADO.INIT; 

for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev) => {
   op(ev.target.value);
  }
}

for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev)=> {
    number(ev.target.value);
  }
}

igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  estado = ESTADO.OP1;
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
  ESTADO.punto= false;
}

function op(oper){
  if (estado == ESTADO.OP1){
    display.innerHTML += oper;
    estado = ESTADO.OPERATION;
    ESTADO.punto = true;
  }
}

function number (num){
  if(estado == ESTADO.INIT) {
    display.innerHTML = num;
    estado = ESTADO.OP1;
  }else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
    display.innerHTML += num;
    if (estado == ESTADO.OPERATION) {
        estado = ESTADO.OP2;
        ESTADO.punto = false;
    }
  }
}

punto.onclick = (ev) => {
  if(ESTADO.punto){
    console.log("Error introduciendo punto");
  }else if(estado == ESTADO.INIT){
    ESTADO.punto = null;
  } else{
    display.innerHTML += ev.target.value;
    ESTADO.punto = true;
  }
}
