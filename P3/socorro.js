const canvas = document.getElementById( "myCanvas" );
const ctx = canvas.getContext( "2d" );
const LADRILLO = {
    C: 5,
    F: 3,
    W: 75,
    H: 20,
    Padding: 10,
    Top: 30,
    Left: 30
};
const RAQUETA = {
    anchoraqueta= 10,
    largoraqueta= 75
};
const radio = 7;
const origen_x= 0;
const origen_y= 45;

// Declarar ciertas cosas
let puntuacion;
let vidas;
let raqueta;
let jugar = false;

// Coordenadas iniciales de la bola
let bolax;
let bolay;

// Velocidades y radio de la bola
let velx = 3;
let vely = 3;