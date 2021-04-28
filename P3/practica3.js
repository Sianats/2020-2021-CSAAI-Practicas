console.log("Ejecutando JS...");

reset = document.getElementById("reset")
const canvas = document.getElementById("canvas");
const radio = 7;
let puntuacion;
let vidas;
let raqueta;
const anchoraqueta= 10;
const largoraqueta= 75;
const origen_x= 0;
const origen_y= 40;
const LADRILLO = {
  F: 8,  // Filas
  C: 14,  // Columnas
  w: 35,
  h: 10,
  padding: 5,
  visible: true
};


raqueta= (canvas.width - largoraqueta) / 2;
var derecha;
var izquierda;


window.onkeydown = (ev)=>{
  switch (ev.keyCode) {
      case 39:
        raq = -derecha;
        break;
      
      case 37:
        izquierda = -izquierda;
        break;

  }}

//function moverConRaton(e) {
//    var localiz = e.clientX - canvas.offsetLeft;
//   if ( localiz > 0 && localiz < canvas.width ) {
//       raqueta = localiz - largoraqueta / 2;
//   }
//}


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
let raq = 10;

//-- Velocidades del objeto
let velx = 1;
let vely = 1;
let velraq = 0;


//document.addEventListener( "mousemove", moverConRaton, false );
canvas.addEventListener( 'click', update, false );
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
  raq = raq + velraq;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();

  //-- Dibujar
  ctx.arc( x, y, radio, 0, Math.PI * 2 );
  ctx.fillStyle = 'white';

//-- Estructura de los ladrillos
const ladrillos = [];

for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];
    for (let j = 0; j < LADRILLO.C; j++) {
      ladrillos[i][j] = {
          x: ((LADRILLO.w + LADRILLO.padding) * j) + origen_x,
          y: ((LADRILLO.h + LADRILLO.padding) * i) + origen_y,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

ladrillos[0][1].visible = false;


//-- Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {

      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
      }
    }
}
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

