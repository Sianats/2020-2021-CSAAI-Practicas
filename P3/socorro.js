const canvas = document.getElementById( "canvas" );
canvas.width = 350;
canvas.height = 500;
const ctx = canvas.getContext( "2d" );
const columnas = 9;
const filas = 8;
const ancholadrillo = 35;
const alturaladrillo = 10;
const Paddingladrillo = 5;
const bricktop = 45;
const brickleft = 0;
const anchoraqueta = 75;
const altoraqueta = 10;
const radio = 7;

// Declarar ciertas cosas
let LADRILLO;
let puntuacion;
let vidas;
let raqueta;
let jugar;
let izquierda;
let derecha;

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
    jugar = false;
    puntuacion = 0;
    vidas = 3;
    izquierda = false;
    derecha = false;


    // Funcion que voy a crear para que dibuje las cosas
    draw();
}

document.onkeydown = (e)=> {
    switch (e.keyCode) {
        case 37:
            izquierda = true;

            if ( raqueta > 0 ){
                raqueta -= 7;
            }
            break;

        case 39:
            derecha = true;
            if ( raqueta < canvas.width - anchoraqueta ){
                raqueta += 7;
            }
            break;

        case 32:
            jugar = true;
            break;
    }
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

function drawpuntuacion() {
    ctx.textAlign = "left";
    ctx.font = "40px CharriotDeluxe";
    ctx.fillStyle = "white";
    ctx.fillText( "00" + puntuacion, 10, 35 );
}

function drawvidas() {
    ctx.textAlign = "left";
    ctx.font = "40px CharriotDeluxe";
    ctx.fillStyle = "white";
    ctx.fillText( "00" + vidas, canvas.width - 75, 35 );
}

function drawladrillos() {
    for ( var i = 0; i < filas; i++ ) {
        for ( var j = 0; j < columnas; j++ ) {
        if ( LADRILLO[i][j].status == 1 ) {
            var x = ( j * ( ancholadrillo + Paddingladrillo ) ) + brickleft;
            var y = ( i * ( alturaladrillo + Paddingladrillo ) ) + bricktop;
            LADRILLO[i][j].x = x;
            LADRILLO[i][j].y = y;
            ctx.beginPath();
            ctx.rect( x, y, ancholadrillo, alturaladrillo );
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}

function draw(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    drawbola();
    drawraqueta();
    drawvidas();
    drawpuntuacion();
    drawladrillos();

    if ( x + velx > canvas.width - radio || x + velx < radio ) {
        velx = -velx;
    }

    if ( y + vely < radio ) {
        vely = -vely;
    } else if ( y + vely > canvas.height - radio ) {
        if ( x> raqueta && x < raqueta + anchoraqueta ) {
        vely = -vely;
        }
    }

    x += velx;
    y += vely;
   requestAnimationFrame(draw);
}

update();