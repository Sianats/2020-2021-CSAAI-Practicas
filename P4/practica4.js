console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const daltvila = document.getElementById('daltvila');
const esvedra = document.getElementById('esvedra');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const R_deslizador = document.getElementById('R_deslizador');
const G_deslizador = document.getElementById('G_deslizador');
const B_deslizador = document.getElementById('B_deslizador');
var escalagrises = document.getElementById('escalagrises');
const colores = document.getElementById('colores');

//-- Valor del deslizador
const R_value = document.getElementById('R_value');
const G_value = document.getElementById('G_value');
const B_value = document.getElementById('B_value');

daltvila.onclick = () => {
  daltvila.onload = function(){
  };
  img = daltvila;
  canvas.width = img.width;
  canvas.height =  img.height;
  ctx.drawImage(img, 0,0);
}

esvedra.onclick = () => {
  daltvila.onload = function(){
  };
  img = esvedra;
  canvas.width = img.width;
  canvas.height =  img.height;
  ctx.drawImage(img, 0,0);
}

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

colores.onclick = () =>{
  //-- Funcion de retrollamada del deslizador
  R_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    R_value.innerHTML = R_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral = R_deslizador.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
  }

  G_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    G_value.innerHTML = G_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral = G_deslizador.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i+1] = umbral;
    }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
  }

  B_deslizador.oninput = () => {
    //-- Mostrar el nuevo valor del deslizador
    B_value.innerHTML = G_deslizador.value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral de rojo del desliador
    umbral = B_deslizador.value

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i+2] = umbral;
    }
      //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
  }
}

escalagrises.onclick =()=>{
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  for (let i = 0; i < data.length; i+=4) {
      brillo = (3 * data[i] + 4 * data[i+1] + data[i+2])/8;
      data[i] = brillo;
      data[i+1] = brillo; 
      data[i+2] = brillo; 
  }
  ctx.putImageData(imgData, 0, 0);
}

// button.onclick = () => {
//   //-- Cambiar de color el texto
//   if (button_test.style.color == "") {
//       button_test.style.color = "green";
//   } else {
//       button_test.style.color = "";
//   }
// }

console.log("Fin...");