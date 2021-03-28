display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")
operacion = document.getElementsByClassName ("operador")
digitos = document.getElementsByClassName("digito")
signo= document.getElementById("signo")
raiz = document.getElementById("raiz")
raizcubica = document.getElementById("raizcubica")
seno = document.getElementById("sen")
coseno = document.getElementById("cos")
log = document.getElementById("log")
ln = document.getElementById("ln")
tangente = document.getElementById("tan")

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
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
}

function op(oper){
  if (estado != ESTADO.OPERATION){
    display.innerHTML += oper;
    estado = ESTADO.OPERATION;
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
    }
  }
}

signo.onclick = () => {
    display.innerHTML = display.innerHTML * (-1);
}

raiz.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

raizcubica.onclick = () => {
    display.innerHTML = Math.pow(display.innerHTML, 1/3);
}

seno.onclick = () => {
    display.innerHTML = Math.sin(display.innerHTML);
}

coseno.onclick = () => {
    display.innerHTML = Math.cos(display.innerHTML);
}

tangente.onclick = () => {
    display.innerHTML = Math.tan(display.innerHTML);
}

log.onclick = () => {
    display.innerHTML = Math.log10(display.innerHTML);
}

ln.onclick = () => {
    display.innerHTML = Math.log(display.innerHTML);
}