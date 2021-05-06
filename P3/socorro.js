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

// Estilo de la letra
ctx.font = "40px CharriotDeluxe";
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
let velx = 3;
let vely = 3;

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

function quitarladrillos() {
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
                        ctx.textAlign = "center";
                        ctx.fillText( 'You won!', canvas.width - 275, 250 );
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
    ctx.fillText( "00" + puntuacion, 10, 35 );
}

function drawvidas() {
    ctx.fillText( "00" + vidas, canvas.width - 75, 35 );
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
    quitarladrillos();


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
                    velx = 3;
                    vely = -3;
                }
            } 
        } 

        x += velx;
        y += vely;

    } else if ( !vidas ) {
        ctx.textAlign = "left";
        ctx.fillStyle = 'white';
        ctx.fillText( 'Game Over', canvas.width - 275, 250 );
        canvas.addEventListener( 'click', restart, false);
    }

    requestAnimationFrame(draw);
}

function restart () {
    document.location.reload();
}

update();