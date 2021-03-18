

const display = document.getElementById("display");
const boton = document.getElementById("boton");
let cont = 0;

boton.onclick = () => {
  console.log("Pulsado");

  cont += 1;

  display.innerHTML = cont;
}