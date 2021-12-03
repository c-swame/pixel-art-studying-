const pixelBoard = document.getElementById('pixel-board');
const ListaDeCores = document.getElementsByClassName('color');
const listaDePixels = document.getElementsByClassName('pixel');
const clearButton = document.getElementById('clear-board');
const paintModeButton = document.getElementById('paint-mode');
const boardModeButton = document.getElementById('board-mode');
const gradRemoveButton = document.getElementById('grad-remove');
const pixelStyleButton = document.getElementById('pixel-style');
const opacityButton = document.getElementById('opacity');
const inputBoardSize = document.getElementById('board-size');
const newBoardButton = document.getElementById('generate-board');
// const elementSelected = document.getElementsByClassName('color')[0];
const divCor1 = document.getElementsByClassName('color')[0];
const divCor2 = document.getElementsByClassName('color')[1];
const divCor3 = document.getElementsByClassName('color')[2];
const divCor4 = document.getElementsByClassName('color')[3];
divCor1.style.backgroundColor = 'rgb(0,0,0)';
let selecionada = 'rgba(0,0,0,1)';
// função auxiliar: gerar cores aleatórias; a cor é retornada como string "'rgb(x, y, z)'"
let opacity = 1;
function colorCreator() {
  const red = (Math.round(Math.random() * 240));
  const green = (Math.round(Math.random() * 240));
  const blue = (Math.round(Math.random() * 240));
  const color = `rgba(${red}, ${green}, ${blue}, 0.99)`;
  return color;
}

divCor2.style.backgroundColor = colorCreator();
divCor3.style.backgroundColor = colorCreator();
divCor4.style.backgroundColor = colorCreator();

//

// função para mudar a cor dos elementos da paleta de cores;
function colorPalletChanger(event) {
  const elemento = event.target;
  const color = colorCreator();
  console.log(color);
  elemento.style.backgroundColor = color;
  console.log(elemento.style.backgroundColor);
}

// atribuição da função colorPalletChanger à paleta de cores;
for (let i = 1; i < ListaDeCores.length; i += 1) {
  ListaDeCores[i].addEventListener('dblclick', colorPalletChanger);
}

//

// Função para selecionar cor do 'paint'.
function colorSelector(event) {
  const elemento = event.target;
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  elemento.classList.toggle('selected');
  selecionada = getComputedStyle(elemento).backgroundColor;
  const corDoBotao = getComputedStyle(document.querySelector('.selected')).backgroundColor;
  opacityButton.style.background = corDoBotao;
}

// atribuição da função colorSelector à paleta de cores;
for (let i = 0; i < ListaDeCores.length; i += 1) {
  ListaDeCores[i].addEventListener('click', colorSelector);
}

//

// Função que permite pintar o pixel-board;
let brush = true; // variável auxiliar da função alternatePaintingMode

function paint(event) {
  if (brush === true) {
    const pixelAPintar = event.target;
    pixelAPintar.style.backgroundColor = selecionada;
    pixelBoard.style.background = 'white';
  }
}

pixelBoard.addEventListener('click', paint);

// função para criar o quadro ao iniciar a sessão;

// function addDefaultPixelBoard() {
//   for (let i = 0; i < 5; i += 1) {
//     const newLine = document.createElement('div');
//     newLine.classList.add('linha-de-pixels');
//     pixelBoard.appendChild(newLine);
//     const line = document.getElementsByClassName('linha-de-pixels');
//     for (let index2 = 0; index2 < 25; index2 += 1) {
//       const newPixel = document.createElement('div');
//       newPixel.classList.add('pixel');
//       newPixel.style.backgroundColor = 'white';
//       line[i].appendChild(newPixel);
//     }
//     pixelBoard.style.maxWidth = `${40*5}px`
//   }

function addDefaultPixelBoard() {
  for (let index2 = 0; index2 < 25; index2 += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.style.backgroundColor = 'white';
    pixelBoard.appendChild(newPixel);
  }
  pixelBoard.style.maxWidth = `${40 * 5}px`;
}

window.addEventListener('load', addDefaultPixelBoard);

// Função para permitir que o user altere o tamanho do quadro;

//

// Função para 'limpar' o quadro o preenchendo de branco:

function clearBoard() {
  for (let i = 0; i < listaDePixels.length; i += 1) {
    listaDePixels[i].style.backgroundColor = 'white';
  }
}

clearButton.addEventListener('click', clearBoard);

//

// função para alterar o tamanho do quadro;
let newSideSize = 5;

inputBoardSize.addEventListener('change', () => {
  if (inputBoardSize.value < 5) {
    newSideSize = 5;
  } else if (inputBoardSize.value > 50) {
    newSideSize = 50;
  } else {
    newSideSize = inputBoardSize.value;
  }
});

function addCustomPixelBoard() {
  if (!inputBoardSize.value) {
    alert('Board inválido!');
  }
  const newBoardSize = newSideSize ** 2;
  const newBoard = document.createElement('section');
  for (let index2 = 0; index2 < newBoardSize; index2 += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.style.backgroundColor = 'white';
    newBoard.appendChild(newPixel);
  }
  pixelBoard.style.maxWidth = `${40 * newSideSize}px`;
  pixelBoard.innerHTML = newBoard.innerHTML;
}

newBoardButton.addEventListener('click', addCustomPixelBoard);

// Bonus MEU adicionar uma opção para alterar a borda para dotted, unset ou none, dashed, inset e outset.
// Bonus MEW adicionar duploClick para limpar quadrado; Colocar botão para ativar essa opção, que sinalize ativado e desativado;
// Colocar input para selecionar as cores (pode usar três range ou deixar que digitem);

//

// Bonus MEU adicinar botão para alterar o tom/opacidade da cor selecionada;
opacityButton.addEventListener('click', (event) => { // tentar adicionar um grag como evento
  opacity = event.target.value;
  const elementoAAlterar = document.querySelector('.selected');
  const corAAlterar = getComputedStyle(elementoAAlterar).backgroundColor;
  const arrayCorAAlterar = corAAlterar.split(',');
  arrayCorAAlterar[3] = ` ${opacity})`;
  const arrayNovaCor = arrayCorAAlterar;
  const novaCor = arrayNovaCor.join();
  document.querySelector('.selected').style.backgroundColor = novaCor;
  const corDoBotao = getComputedStyle(document.querySelector('.selected')).backgroundColor;
  opacityButton.style.background = corDoBotao;
});

// Bonus MEU adicionar botões para gerar imagem espelhada do botão e para gerar imagem de cabeça para baixo;

// Função / botão para deixar o pincel ativo continuamente, podendo alternar entre pintar / não pintar ao clicar dentro do quadro. Clinar novamente no botão desativará esse modo e volta ao que se tem que clicar para plintar.

function interruptBrushFlow() { // função auxiliar para desligar o pincel e interropenr o mouseover da função adicionada abaixo ao 'paintModeButton'.
  if (brush) {
    brush = false;
  } else {
    brush = true;
  }
}

let validation = false; // verificar se o modo flow está atívo

function alternatePaintingMode() {
  if (!validation) {
    validation = true;
    pixelBoard.addEventListener('mouseover', paint);
    pixelBoard.addEventListener('click', interruptBrushFlow);
  } else {
    validation = false;
    brush = true;
    pixelBoard.removeEventListener('mouseover', paint);
    pixelBoard.removeEventListener('click', interruptBrushFlow);
  }
}

paintModeButton.addEventListener('click', alternatePaintingMode);

// Função para remover as linhas do pixelBoard;
let gradRemoved = false;
gradRemoveButton.addEventListener('click', () => {
  if (!gradRemoved) {
    for (let i = 0; i < listaDePixels.length; i += 1) {
      listaDePixels[i].classList.toggle('no-border');
    }
    gradRemoved = true;
  } else {
    // pixel.style.border = 'black 1px solid';
    for (let i = 0; i < listaDePixels.length; i += 1) {
      listaDePixels[i].classList.toggle('no-border');
    }
    gradRemoved = false;
  }
});

// Função para deixar os pixels arredondados;

let circle = false;
pixelStyleButton.addEventListener('click', () => {
  if (!circle) {
    for (let i = 0; i < listaDePixels.length; i += 1) {
      listaDePixels[i].classList.toggle('circle');
    }
    circle = true;
  } else {
    for (let i = 0; i < listaDePixels.length; i += 1) {
      listaDePixels[i].classList.toggle('circle');
    }
    circle = false;
  }
});

// Função para alterar estilo do quadro para pixels menores, mas ocupando o mesmo volume:

// let littlePixels = false;

// function changePixelBoardStyle() {
//   if (!littlePixels) {
//     console.log(listaDePixels.length);
//     littlePixels = true;
//     const newBoard = document.createElement('section');
//     console.log(newSideSize)
//     for (let index2 = 0; index2 < (listaDePixels.length * 10) ; index2 += 1) {
//       console.log('x');
//       const newPixel = document.createElement('div');
//       newPixel.classList.add('pixel');
//       newPixel.style.backgroundColor = 'white';
//       newPixel.style.padding = '0px';
//       newPixel.style.height = '10px';
//       newPixel.style.width = '10px';
//       newPixel.style.margin = '-5px';
//       newPixel.style.border = 'white 0px solid';
//       newBoard.appendChild(newPixel);
//     }
//     pixelBoard.innerHTML = newBoard.innerHTML;
//     pixelBoard.style.maxWidth = `${newSideSize * 10 * 50}px`
//   }
// }
// boardModeButton.addEventListener('click', changePixelBoardStyle);
