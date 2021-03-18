const botones = document.getElementsByClassName("digito");



function digito(value)
{
  console.log("Valor: " + value);
}

for (let boton of botones) {


  boton.onclick = (ev) => {
    digito(ev.target.value)
  }
}