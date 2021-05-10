const canvas = document.getElementById( "canvas" );
canvas.width = 550;
canvas.height = 600;
const ctx = canvas.getContext( "2d" );
facil = document.getElementById("facil")
medio = document.getElementById("medio")
dificil = document.getElementById("dificil")
const columnas = 14;
const filas = 8;
const ancholadrillo = 35;
const alturaladrillo = 10;
const Paddingladrillo = 5;
const bricktop = 50;
const brickleft = 0;
const altoraqueta = 10;
const radio = 8;

// Efectos de sonido
const golperaqueta = new Audio('golperaqueta.wav');
const golpelado = new Audio('golpelado.wav');
const golpeladrillo = new Audio('golpeladrillo.wav');

// Estilo de la letra
ctx.font = "50px CharriotDeluxe";
ctx.textAlign = "left";

// Declarar ciertas cosas
let LADRILLO;
let puntuacion;
let vidas;
let raqueta;
let jugar;
let izquierda;
let derecha;
let anchoraqueta = 95;

// Coordenadas iniciales de la bola
let x;
let y;

// Velocidades de la bola
var velx;
var vely;

// Se usa la funcion restart al hacer click en canvas
canvas.addEventListener( 'click', restart, false );

function update() {
    // No podemos restablecer el juego mientras jugamos
    canvas.removeEventListener( 'click', restart, false );

    // Array para los ladrillos
    LADRILLO = [];
    for ( var i = 0; i < filas; i++ ) {
        LADRILLO[i] = [];
        for ( var j = 0; j < columnas; j++ ) {
        LADRILLO[i][j] = {x: 0, y: 0, visible: 1};
        }
    }

    // valores iniciales
    raqueta = ( canvas.width - anchoraqueta ) / 2;
    anchoraqueta = 95;
    x = canvas.width / 2;
    y = canvas.height - 40;
    jugar = false;
    puntuacion = 0;
    vidas = 3;
    izquierda = false;
    derecha = false;

    // Funcion dibujar los elementos
    draw();
}

// Funciones de modo, dependiendo de qué boton pulses,
// la bola se mueve a una velocidad distinta.

facil.onclick = () =>{
    velx = 3;
    vely = -3;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

}

medio.onclick = () =>{
    velx = 4;
    vely = -4;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

}

dificil.onclick = () =>{
    velx = 6;
    vely = -6;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

}

// Dependiendo de que tecla pulsemos, tiene una funcion u otra
document.onkeydown = (e)=> {
    switch (e.keyCode) {
        case 37:
            izquierda = true;

            if ( raqueta > 0 ){
                raqueta -= 9;
            }
        break;

        case 39:
            derecha = true;
            if ( raqueta < canvas.width - anchoraqueta ){
                raqueta += 9;
            }
        break;

        case 32:
            jugar = true;
        break;
    }
}

// Funcion dibujar bola
function drawbola() {
    ctx.beginPath();
    ctx.arc( x, y, radio, 0, Math.PI * 2 );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// Array para que desaparezcan los ladrillos al tocarlos con la bola.
function romperladrillos() {
    for ( var i = 0; i < filas; i++ ) {
        for ( var j = 0; j < columnas; j++ ) {
        var b = LADRILLO[i][j];
            if ( b.visible == 1 ) {
                if ( x > b.x && x < b.x + ancholadrillo && y > b.y && y < b.y + alturaladrillo ) {
                    golpeladrillo.play();
                    vely = -vely;
                    // Desaparece
                    b.visible = 0;
                    // Valores de puntuación variables dependiendo del color de ladrillo
                    if (i == 0 || i == 1){
                        puntuacion += 7;
                    } else if (i == 2 || i == 3){
                        puntuacion += 5;
                    } else if (i == 4 || i == 5){
                        puntuacion += 3;
                    } else if (i == 6 || i == 7){
                        puntuacion += 1;
                    }

                }
            }
        }
    }

    // Si ganas
    if ( puntuacion == 448 ) {
        jugar = false;
        ctx.fillStyle = "white";
        ctx.fillText( 'You won!', 150, 350 );
        canvas.addEventListener( 'click', restart, false );
    }
}

// Funcion dibujar raqueta
function drawraqueta() {
    ctx.beginPath();
    ctx.rect( raqueta, canvas.height - 20, anchoraqueta, altoraqueta );
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    // Si llegamos a esa puntuacion, la raqueta mengua
    if (puntuacion >= 149 && puntuacion < 298){
        anchoraqueta = 75;
    } else if(puntuacion >= 298){
        anchoraqueta = 55;
    }
}

// Dibujar la puntuación
function drawpuntuacion() {
    ctx.fillStyle = "white";
    ctx.fillText( puntuacion, 10, 40 );
}

// Dibujar las vidas
function drawvidas() {
    ctx.fillStyle = "white";
    ctx.fillText( "00" + vidas, canvas.width - 90, 40 );
}

// Funcion dibujar ladrillos con array
function drawladrillos() {
    for ( var i = 0; i < filas; i++ ) {
        for ( var j = 0; j < columnas; j++ ) {
            if ( LADRILLO[i][j].visible == 1 ) {
                var x1 = ( j * ( ancholadrillo + Paddingladrillo ) ) + brickleft;
                var y1 = ( i * ( alturaladrillo + Paddingladrillo ) ) + bricktop;
                LADRILLO[i][j].x = x1;
                LADRILLO[i][j].y = y1;
                ctx.beginPath();
                ctx.rect( x1, y1, ancholadrillo, alturaladrillo );
                // Colores de ladrillos distintos
                if (i == 0 || i == 1){
                    ctx.fillStyle = "red";
                } else if (i == 2 || i == 3){
                    ctx.fillStyle = "orange";
                } else if (i == 4 || i == 5){
                    ctx.fillStyle = "green";
                } else if (i == 6 || i == 7){
                    ctx.fillStyle = "yellow";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Funcion dibujar todos los elementos
function draw(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    drawbola();
    drawraqueta();
    drawvidas();
    drawpuntuacion();
    drawladrillos();
    romperladrillos();

    // Si pulsas el espacio, que empiece el juego
    if (jugar){
        if ( x + velx > canvas.width - radio || x + velx < radio ) {
            golpelado.play();
            velx = -velx;
        }

        if ( y + vely < 50 ) {
            golpelado.play();
            vely = -vely;
        } else if ( y + vely > canvas.height - 26 ) {
            if ( x > raqueta && x < raqueta + anchoraqueta ) {
                golperaqueta.play();
                vely = -vely;
            } else {
                vidas--;
                if ( !vidas ) {
                    vidas = 0;
                    velx = 0;
                    vely = 0;
                    jugar = false;
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 100;
                    velx = velx;
                    vely = -vely;
                }
            } 
        } 

        x += velx;
        y += vely;

    } else if ( !vidas ) { // Si pierdes todas las vidas
        ctx.fillStyle = 'white';
        ctx.fillText( 'Game Over', 150, 350 );
        canvas.addEventListener( 'click', restart, false);
    }

    // Iniciar la animación
    requestAnimationFrame(draw);
}

// Recargar la página
function restart () {
    document.location.reload();
}

update();