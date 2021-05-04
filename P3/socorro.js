const canvas = document.getElementById( "myCanvas" );
const ctx = canvas.getContext( "2d" );
const LADRILLO;
const columnas = 5;
const filas = 3;
const ancholadrillo = 75;
const alturaladrillo = 20;
const Paddingladrillo = 10;
const bricktop = 30;
const brickleft = 30;
const RAQUETA;
const anchoraqueta= 10;
const largoraqueta= 7;
const radio = 7;
const origen_x= 0;
const origen_y= 45;

// Declarar ciertas cosas
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
    RAQUETA = ( canvas.width - paddleWidth ) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    jugar = true;
    puntuacion = 0;
    vidas = 3;


    // Start animation
    draw();
    }