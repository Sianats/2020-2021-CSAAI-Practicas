const canvas = document.getElementById( "canvas" );
canvas.width = 550;
canvas.height = 700;
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
const anchoraqueta = 95;
const altoraqueta = 10;
const radio = 10;

// Estilo de la letra
ctx.font = "50px CharriotDeluxe";
ctx.fillStyle = "white";
ctx.textAlign = "left";

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

// Velocidades de la bola
var velx;
var vely;

canvas.addEventListener( 'click', restart, false );

function update() {
    canvas.removeEventListener( 'click', restart, false );

    // array para los ladrillos
    LADRILLO = [];
    for ( var i = 0; i < filas; i++ ) {
        LADRILLO[i] = [];
        for ( var j = 0; j < columnas; j++ ) {
        LADRILLO[i][j] = {x: 0, y: 0, visible: 1};
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

facil.onclick = () =>{
    velx = 3;
    vely = -3;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

}

medio.onclick = () =>{
    velx = 5;
    vely = -5;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

}

dificil.onclick = () =>{
    velx = 7;
    vely = -7;
    facil.onclick = false;
    medio.onclick = false;
    dificil.onclick = false;

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

function romperladrillos() {
    for ( var i = 0; i < filas; i++ ) {
        for ( var j = 0; j < columnas; j++ ) {
        var b = LADRILLO[i][j];
            if ( b.visible == 1 ) {
                if ( x > b.x && x < b.x + ancholadrillo && y > b.y && y < b.y + alturaladrillo ) {
                    vely = -vely;
                    b.visible = 0;
                    puntuacion++;
                    if ( puntuacion == columnas * filas ) {
                        jugar = false;
                        ctx.fillText( 'You won!', 150, 350 );
                        canvas.addEventListener( 'click', restart, false );
                    }
                }
            }
        }
    }
}

function drawraqueta() {
    ctx.beginPath();
    ctx.rect( raqueta, canvas.height - altoraqueta, anchoraqueta, altoraqueta );
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawpuntuacion() {
    ctx.fillText( "00" + puntuacion, 10, 40 );
}

function drawvidas() {
    ctx.fillText( "00" + vidas, canvas.width - 90, 40 );
}

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
                ctx.fillStyle = "white";
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

function draw(){
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    drawbola();
    drawraqueta();
    drawvidas();
    drawpuntuacion();
    drawladrillos();
    romperladrillos();


    if (jugar){
        if ( x + velx > canvas.width - radio || x + velx < radio ) {
            velx = -velx;
        }

        if ( y + vely < 40 ) {
            vely = -vely;
        } else if ( y + vely > canvas.height - (radio + altoraqueta) ) {
            if ( x > raqueta && x < raqueta + anchoraqueta ) {
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

    } else if ( !vidas ) {
        ctx.fillStyle = 'white';
        ctx.fillText( 'Game Over', 150, 350 );
        canvas.addEventListener( 'click', restart, false);
    }

    requestAnimationFrame(draw);
}

function restart () {
    document.location.reload();
}

update();