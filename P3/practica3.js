console.log("Ejecutando JS...");

// Declarar el canvas
const canvas = document.getElementById("canvas");
canvas.width = 350;
canvas.height = 500;
const ctx = canvas.getContext("2d");
canvas.addEventListener( 'click', update, false );

// Declarar ciertas cosas
let puntuacion;
let vidas;
let raqueta;

// Coordenadas iniciales de la bola
let bolax;
let bolay;

// Velocidades y radio de la bola
let velx = 3;
let vely = 3;
const radio = 7;

// Caracteristicas raqueta
const anchoraqueta= 10;
const largoraqueta= 75;
raqueta= (canvas.width - largoraqueta) / 2;

// Posicion de los ladrillos
const origen_x= 0;
const origen_y= 45;
const LADRILLO = {
  F: 8,  // Filas
  C: 9,  // Columnas
  w: 35,
  h: 10,
  padding: 5,
  visible: true
};

//function moverConRaton(e) {
//    var localiz = e.clientX - canvas.offsetLeft;
//   if ( localiz > 0 && localiz < canvas.width ) {
//       raqueta = localiz - largoraqueta / 2;
//   }
//}

function drawRaqueta() {
    ctx.beginPath();
    ctx.rect(raqueta, canvas.height - anchoraqueta, largoraqueta, anchoraqueta);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawbola (){
  ctx.beginPath();
  //-- Dibujar
  ctx.arc( bolax, bolay, radio, 0, Math.PI * 2 );
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}
//document.addEventListener( "mousemove", moverConRaton, false );

//-- Funcion principal de animacion
function update() 
{

  vidas= 3;
  puntuacion= 0;
  //-- 2) Borrar el canvas
 ctx.clearRect(0, 0, canvas.width, canvas.height);
  
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


//-- Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {
      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'white';
        }
        ctx.fill();
        ctx.closePath();
      }
    }

  //-- Rellenar
  ctx.fill();

  //-- Dibujar el trazo
  ctx.stroke()
  ctx.closePath();



  drawScore();
  drawLives();
  drawRaqueta();
  drawbola();
  bola();
    //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

function bola(){ 
   bolax = canvas.width / 2;
  bolay = canvas.height - 50;
   //-- Algoritmo de animacion:
  //-- 1) Actualizar posicion del  elemento
  //-- (física del movimiento rectilineo uniforme)

   //-- Condicion de rebote en extremos verticales del canvas
   if (bolax < 7 || bolax >= canvas.width - radio) {
    velx = -velx;
  }

  //-- Condición de rebote en extremos horizontales del canvas
  if (bolay <= radio || bolay > canvas.height - radio) {
    vely = -vely;
  }



  //-- Actualizar la posición
  bolax = bolax + velx;
  bolay = bolay + vely; 
}

function restart (ev){
  if (ev.keyCode =='32'){
    update();
  }
}

function moverraqueta(ev){
    if (ev.keyCode =='39'){
      ctx.filltext("derecha");
  } else if (ev.keyCode =='37'){
    ctx.filltext("izquierda");
  }
}

//todavia no sé si funciona porque no se me mueve la bola ya
function romperladrillos() {
  
  for ( var i = 0; i < LADRILLO.F; i++ ) {
      for ( var j = 0; j < LADRILLO.C; j++ ) {
      var b = LADRILLO[i][j];
      if ( b.status == 1 ) {
          if ( bolax > b.x && bolax < b.x + LADRILLO.w && bolay > b.y && bolay < b.y + LADRILLO.h ) {
          vely = -vely;
          b.status = 0;
          puntuacion++;
          if ( puntuacion == LADRILLO.C * LADRILLO.F ) {
              ctx.textAlign = "center";
              ctx.font = "24px CharriotDeluxe";
              ctx.fillStyle = '#fff';
              ctx.fillText( "¡Ganaste!", 240, 140 );
              document.addEventListener( 'restart', update, false );
          }
          }
      }
      }
  }
}

function drawScore() {
  ctx.textAlign = "left";
  ctx.font = "40px CharriotDeluxe";
  ctx.fillStyle = "white";
  ctx.fillText("00" + puntuacion, 8, 30);
}

function drawLives() {
  ctx.textAlign = "left";
  ctx.font = "40px CharriotDeluxe";
  ctx.fillStyle = "white";
  ctx.fillText( "00" + vidas, canvas.width - 70, 30 );
} 

//-- ¡Que empiece la función!
update();

