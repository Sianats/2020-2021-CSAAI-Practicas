console.log("Ejecutando JS...");

reset = document.getElementById("reset")
const canvas = document.getElementById("canvas");
const radio = 7;
let puntuacion;
let vidas;
let raqueta;
const anchoraqueta= 10;
const largoraqueta= 75;

raqueta= (canvas.widht - largoraqueta) / 2;
derecha = false;
izquierda = false;

function abajo( e ) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        derecha = true;
    } else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        izquierda = true;
    }
    }

    function arriba( e ) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        derecha = false;
    } else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        izquierda = false;
    }
    }
function moverConRaton(e) {
    var localiz = e.clientX - canvas.offsetLeft;
    if ( localiz > 0 && localiz < canvas.width ) {
        raqueta = localiz - largoraqueta / 2;
    }
}

function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(raqueta, canvas.height - anchoraqueta, largoraqueta, anchoraqueta);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}
//-- Definir el tamaño del canvas
canvas.width = 350;
canvas.height = 500;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 10;
let y =10;

//-- Velocidades del objeto
let velx = 1;
let vely = 1;

//-- Funcion principal de animacion
function update() 
{
  vidas: 3;
  puntuacion: 0;
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

   //-- Condicion de rebote en extremos verticales del canvas
   if (x < 7 || x >= canvas.width - radio) {
    velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= radio || y > canvas.height - radio) {
    vely = -vely;
  }

  //-- Actualizar la posición
  x = x + velx;
  y = y + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();

  //-- Dibujar
  ctx.arc( x, y, radio, 0, Math.PI * 2 );
  ctx.fillStyle = 'white';


  //-- Rellenar
  ctx.fill();

  //-- Dibujar el trazo
  ctx.stroke()
  ctx.closePath();


  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
  drawScore();
  drawLives();
  drawRaqueta();
}

function drawScore() {
  ctx.textAlign = "left";
  ctx.font = "16px CharriotDeluxe";
  ctx.fillStyle = "white";
  ctx.fillText(puntuacion, 8, 20);
}

function drawLives() {
  ctx.textAlign = "left";
  ctx.font = "16px CharriotDeluxe";
  ctx.fillStyle = "white";
  ctx.fillText( vidas, canvas.width - 85, 20 );
}
//-- ¡Que empiece la función!
update();

