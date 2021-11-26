const pixelBoard = document.getElementById('pixel-board');
const ListaDeCores = document.getElementsByClassName('color');
const listaDePixels = document.getElementsByClassName('pixel');
const clearButtom = document.getElementById('clear-board');
const opacityButtom = document.getElementById('opacity');
const inputBoardSize = document.getElementById('board-size');
const newBoardButtom = document.getElementById('generate-board')
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

// Função para selecionar cor do 'pincel'.
function colorSelector(event) {
  const elemento = event.target;
  document.getElementsByClassName('selected')[0].classList.remove('selected');
  elemento.classList.toggle('selected');
  selecionada = getComputedStyle(elemento).backgroundColor;
  const corDoBotao = getComputedStyle(document.querySelector('.selected')).backgroundColor;
  opacityButtom.style.background = corDoBotao;
}

// atribuição da função colorSelector à paleta de cores;
for (let i = 0; i < ListaDeCores.length; i += 1) {
  ListaDeCores[i].addEventListener('click', colorSelector);
}

//

// Função que permite pintar o pixel-board;

function pincel(event) {
  const pixelAPintar = event.target;
  pixelAPintar.style.backgroundColor = selecionada;
}

// função para criar o quadro ao iniciar a sessão;

// function adicionarQuadroPadrao() {
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


function adicionarQuadroPadrao() {
  for (let index2 = 0; index2 < 25; index2 += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.style.backgroundColor = 'white';
    pixelBoard.appendChild(newPixel);
  }
  pixelBoard.style.maxWidth = `${40 * 5}px`;
  // adição da função pincel aos pixels
  for (let i2 = 0; i2 < listaDePixels.length; i2 += 1) {
    listaDePixels[i2].addEventListener('click', pincel);
  }
}

window.addEventListener('load', adicionarQuadroPadrao);

// Função para permitir que o user altere o tamanho do quadro;

//

// Função para 'limpar' o quadro o preenchendo de branco:

function clearBoard() {
  for (let i = 0; i < listaDePixels.length; i += 1) {
    listaDePixels[i].style.backgroundColor = 'white';
  }
}

clearButtom.addEventListener('click', clearBoard);

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

function adicionarQuadroPersonalizado() {
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
  // adição da função pincel aos pixels
  pixelBoard.innerHTML = newBoard.innerHTML;
  for (let i2 = 0; i2 < listaDePixels.length; i2 += 1) {
    listaDePixels[i2].addEventListener('click', pincel);
  }
}

newBoardButtom.addEventListener('click', adicionarQuadroPersonalizado);

// Bonus MEU adicionar uma opção para alterar a borda para dotted, unset ou none, dashed, inset e outset.
// Bonus MEW adicionar duploClick para limpar quadrado; Colocar botão para ativar essa opção, que sinalize ativado e desativado;
// Colocar input para selecionar as cores (pode usar três range ou deixar que digitem);

//

// Bonus MEU adicinar botão para alterar o tom/opacidade da cor selecionada;
opacityButtom.addEventListener('click', (event) => { // tentar adicionar um grag como evento
  opacity = event.target.value;
  const elementoAAlterar = document.querySelector('.selected');
  const corAAlterar = getComputedStyle(elementoAAlterar).backgroundColor;
  const arrayCorAAlterar = corAAlterar.split(',');
  arrayCorAAlterar[3] = ` ${opacity})`;
  const arrayNovaCor = arrayCorAAlterar;
  const novaCor = arrayNovaCor.join();
  document.querySelector('.selected').style.backgroundColor = novaCor;
  const corDoBotao = getComputedStyle(document.querySelector('.selected')).backgroundColor;
  opacityButtom.style.background = corDoBotao;
});

// Bonus MEU adicionar botões para gerar imagem espelhada do botão e para gerar imagem de cabeça para baixo;
