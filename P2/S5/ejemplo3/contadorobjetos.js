const gui = {
  display: document.getElementById("display"),
  boton: document.getElementById("boton"),
}

const counter = {
  valor: 0,
  inc : function(value) {
    this.valor += value;
    gui.display.innerHTML = this.valor;
  }
}

gui.boton.onclick = () => {
  counter.inc(1)
}