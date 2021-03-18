const test2 = document.getElementById('test2')
const test1 = document.getElementById('test1')
test2.onclick = () => {
  console.log("Click sobre el párrafo 2...")
  test1.innerHTML = "¡TEXTO CAMBIADO!"
}