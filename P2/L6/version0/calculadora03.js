display = document.getElementById("display")
boton1 = document.getElementsByClassName("boton1")
boton2 = document.getElementsByClassName("boton2")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")


boton1.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
boton2.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
suma.onclick = (ev) => {
    display.innerHTML += ev.target.value;
}
  
igual.onclick = (ev) => {
    display.innerHTML = eval(display.innerHTML);
}
  
clear.onclick = (ev) => {
    display.innerHTML = "0";
}
  