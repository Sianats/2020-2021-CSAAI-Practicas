const gui = {
  display: document.getElementById("display"),
  boton_inc: document.getElementById("boton_inc"),
  boton_dec: document.getElementById("boton_dec")
}

const counter = {
  valor: 0,
  inc : function(value) {
    this.valor += value;
    gui.display.innerHTML = this.valor;
  }
}

gui.boton_inc.onclick = () => {
  counter.inc(1);
}

gui.boton_dec.onclick = () =>{
  counter.inc(-1);
}