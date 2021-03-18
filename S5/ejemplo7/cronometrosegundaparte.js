const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

console.log("Ejecuitando JS...");

const crono = new Crono(gui.display);

gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
}