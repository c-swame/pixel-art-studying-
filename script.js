const pixelBoard = document.getElementById('pixel-board');
const ListaDeCores = document.getElementsByClassName('color');
const listaDePixels = document.getElementsByClassName('pixel');
const divCor1 = document.getElementsByClassName('color')[0];
const divCor2 = document.getElementsByClassName('color')[1];
const divCor3 = document.getElementsByClassName('color')[2];
const divCor4 = document.getElementsByClassName('color')[3];
divCor1.style.backgroundColor = 'rgb(0,0,0)';
divCor2.style.backgroundColor = 'rgb(90,90,90)';
divCor3.style.backgroundColor = 'rgb(180,180,180)';
divCor4.style.backgroundColor = 'rgb(240,240,240)';
let cor2 = getComputedStyle(divCor2).backgroundColor;
let cor3 = getComputedStyle(divCor3).backgroundColor;
let cor4 = getComputedStyle(divCor4).backgroundColor;
let selecionada;
// função auxiliar: gerar cores aleatórias; a cor é retornada como string "'rgb(x, y, z)'"
function colorCreator() {
  const red = (Math.random() * 240);
  const green = (Math.random() * 240);
  const blue = (Math.random() * 240);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

//

// função para mudar a cor dos elementos da paleta de cores;
function colorPalletChanger(event) {
  const elemento = event.target;
  const color = colorCreator();
  elemento.style.backgroundColor = color;
  const newColor = getComputedStyle(elemento).backgroundColor;
  switch (elemento.id) {
  case divCor2.id:
    cor2 = newColor;
    break;
  case divCor3.id:
    cor3 = newColor;
    break;
  case divCor4.id:
    cor4 = newColor;
    break;
  default:
    break;
  }
  console.log(newColor);
}

// atribuição da função colorPalletChanger à paleta de cores;
for (let i = 1; i < ListaDeCores.length; i += 1) {
  ListaDeCores[i].addEventListener('dblclick', colorPalletChanger);
}

//

// Função para selecionar cor do 'pincel'.
function colorSelector(event) {
  const elemento = event.target;
  if (elemento.id === divCor2.id) {
    selecionada = cor2;
  } else if (elemento.id === divCor3.id) {
    selecionada = cor3;
  } else {
    selecionada = cor4;
  }
  console.log(selecionada);
  console.log(listaDePixels);
}

// atribuição da função colorSelector à paleta de cores;
for (let i = 1; i < ListaDeCores.length; i += 1) {
  ListaDeCores[i].addEventListener('click', colorSelector);
}

//

// Função que permite pintar o pixel-board;

function pincel(event) {
  let pixelAPintar = event.target;
  pixelAPintar.style.backgroundColor = selecionada;
}

// função para criar o quadro ao iniciar a sessão;

function adicionarQuadroPadrao() {
  for (let i = 0; i < 5; i += 1) {
    const newLine = document.createElement('div');
    newLine.classList.add('linha-de-pixels');
    pixelBoard.appendChild(newLine);
    const line = document.getElementsByClassName('linha-de-pixels');
    for (let index2 = 0; index2 < 5; index2 += 1) {
      const newPixel = document.createElement('div');
      newPixel.classList.add('pixel');
      newPixel.style.backgroundColor = 'white';
      line[i].appendChild(newPixel);
    }
  }
  // adição da função pincel aos pixels
  for (let i2 = 0; i2 < listaDePixels.length; i2 += 1) {
    listaDePixels[i2].addEventListener('click', pincel);
    console.log('x');
  }
}

window.addEventListener('load', adicionarQuadroPadrao);

// Função para permitir que o user altere o tamanho do quadro;

//
