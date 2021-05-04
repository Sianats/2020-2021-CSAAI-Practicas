const canvas = document.getElementById( "canvas" );
canvas.width = 350;
canvas.height = 500;
const ctx = canvas.getContext( "2d" );
const columnas = 5;
const filas = 3;
const ancholadrillo = 75;
const alturaladrillo = 20;
const Paddingladrillo = 10;
const bricktop = 30;
const brickleft = 30;
const anchoraqueta = 75;
const altoraqueta = 10;
const radio = 7;
const origen_x = 0;
const origen_y = 45;

// Declarar ciertas cosas
let LADRILLO;
let puntuacion;
let vidas;
let raqueta;
let jugar = true;

// Coordenadas iniciales de la bola
let x;
let y;

// Velocidades y radio de la bola
let velx = 3;
let vely = 3;

function update() {

    // array para los ladrillos
    LADRILLO = [];
    for ( var i = 0; i < filas; i++ ) {
        LADRILLO[i] = [];
        for ( var j = 0; j < columnas; j++ ) {
        LADRILLO[i][j] = {x: 0, y: 0, status: 1};
        }
    }

    // valores iniciales
    raqueta = ( canvas.width - anchoraqueta ) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    jugar = true;
    puntuacion = 0;
    vidas = 3;


    // Funcion que voy a crear para que dibuje las cosas
    draw();
}

function drawbola() {
    ctx.beginPath();
    ctx.arc( x, y, radio, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawraqueta() {
    ctx.beginPath();
    ctx.rect( raqueta, canvas.height - altoraqueta, anchoraqueta, altoraqueta);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    drawbola();
    drawraqueta();
    requestAnimationFrame(draw);
}

update();