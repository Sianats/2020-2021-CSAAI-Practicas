//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
var video1 = document.getElementById("video1");
var video2 = document.getElementById("video2");
var video3 = document.getElementById("video3");
const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");
const bucle = document.getElementById("bucle");
const parar = document.getElementById("parar");
const automatico = document.getElementById("autom");
const pararautomatico = document.getElementById("pararautom");
const mute = document.getElementById("mute");
document.getElementById("botones").style.display= 'none';
const unmute = document.getElementById("unmute");
const pause = document.getElementById("pause");
const play = document.getElementById("play");
var bucl;

//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;

video1.width=200;  
video1.height=100;

video2.width=200;  
video2.height=100;

video3.width=200;  
video3.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "nosignal.gif";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;
video3.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
 
    document.getElementById('botones').style.display = 'block';
    //-- Establecer la fuente de la cámara 1
    video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
    video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
    video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

    //-- Reprodeucimos un vídeo, desde el comienzo
    video1.currentTime = 0;
    video1.play();
    video2.currentTime = 0;
    video2.play();
    video3.currentTime = 0;
    video3.play();

    //-- Y en silencio...
    video1.muted = true;
    video2.muted = true;
    video3.muted = true;

    //-- En la emisión en directo ponemos la imagen de prueba
    directo.poster = TEST_IMAGE_URL;
  
    //-- Botón de Test
    btn_test.onclick = () => {
        directo.poster = TEST_IMAGE_URL;
        directo.src = null;
    };
    

    //-- Botón de Selección de la cámara 1
    video1.onclick = () => {
        directo.src = video1.src;
        directo.currentTime = video1.currentTime;
        directo.play();
        directo.poster = null;
    };

    video2.onclick = () => {
        directo.src = video2.src;
        directo.currentTime = video2.currentTime;
        directo.play();
        directo.poster = null;
    };

    video3.onclick = () => {
        directo.src = video3.src;
        directo.currentTime = video3.currentTime;
        directo.play();
        directo.poster = null;
    };

    bucle.onclick = () => {
        bucl = directo.currentTime;
        var time = setInterval(tiempo, 5000);
        function tiempo(){
            directo.currentTime = bucl;
        }

        parar.onclick = () => {
            clearInterval(time);
            bucl = directo.currentTime;
        }
    };

    mute.onclick = () =>{
        directo.muted = true;
        unmute.onclick = () =>{
            directo.muted = false;
        }
    };

    pause.onclick = () =>{
        directo.pause();
    }

    play.onclick = () =>{
        directo.play();
    }
    
    automatico.onclick = () => {
        document.getElementById("video1").disabled=true;
        document.getElementById("video2").disabled=true;
        document.getElementById("video3").disabled=true;
        video1.onclick();
        setTimeout(video2.onclick, 3000);
        setTimeout(video3.onclick, 6000);
        var reinicio = setInterval(change, 9000);
        var segundo;
        var tercero;
        function change() {
            video1.onclick();
            segundo = setTimeout(video2.onclick, 3000);
            tercero = setTimeout(video3.onclick, 6000);
        }

        pararautomatico.onclick = () => {
            clearTimeout(segundo);
            clearTimeout(tercero);
            clearInterval(reinicio);
            document.getElementById("video1").disabled=false;
            document.getElementById("video2").disabled=false;
            document.getElementById("video3").disabled=false;
        }
    }
};

btn_src_off.onclick = () =>{
    document.getElementById('botones').style.display = 'none';
    directo.src = null;
    video1.src = null;
    video2.src = null;
    video3.src = null;
    directo.poster = TEST_IMAGE_URL;
    video1.poster = TEST_IMAGE_URL;
    video2.poster = TEST_IMAGE_URL;
    video3.poster = TEST_IMAGE_URL;
}


