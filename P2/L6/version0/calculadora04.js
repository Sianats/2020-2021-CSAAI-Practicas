display = document.getElementById("display")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
digitos = document.getElementsByClassName("digito")

for (let boton of digitos) {
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
    }
}

suma.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
}
  
clear.onclick = () => {
    display.innerHTML = "0";
}