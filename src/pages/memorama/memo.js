//VARIABLES
var audio;
let tiempoTranscurrido = 30;
let tiempoActual = tiempoTranscurrido;
let intervalo;
var punto = 0;
var firstCard = null;
var secondCard = null;
var listaPuntos = [];
var cards = [
  "../../../resources/image1.jpg",
  "../../../resources/image2.jpg",
  "../../../resources/image3.jpg",
  "../../../resources/image4.jpg",
  "../../../resources/image5.jpg",
  "../../../resources/image6.jpg",
  "../../../resources/image7.jpg",
  "../../../resources/image8.jpg",
];

var parCarta = 0;
var limpio = cards;
const srcVictory = "../../../resources/victory.png";
const srcOver = "../../../resources/gameOver.jfif";

//FUNCIONES

function actualizarCronometro() {
  if (tiempoTranscurrido == 0 || parCarta == 8) {
    if (tiempoTranscurrido == 0) {
      //perdiste
      lanzarModal("GAME OVER", srcOver);
    }
    if (parCarta == 8) {
      //ganaste

      listaPuntos.push(punto);
      listaPuntos.sort(function (a, b) {
        return b - a;
      });
      lanzarModal("WINNER", srcVictory);
    }

    terminar();
    clearInterval(intervalo);
    parCarta = 0;
  } else {
    tiempoTranscurrido--;
    const minutos = Math.floor(tiempoTranscurrido / 60);
    const segundos = tiempoTranscurrido % 60;
    document.getElementById("tiempo").innerHTML =
      minutos.toString().padStart(2, "0") +
      ":" +
      segundos.toString().padStart(2, "0");
  }
}

function shuffleCards(cards) {
  var shuffledCards = [];
  while (cards.length > 0) {
    var randomIndex = Math.floor(Math.random() * cards.length);
    shuffledCards.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }
  return shuffledCards;
}

function asignarPunto(tiempo) {
  if (tiempo < 3) {
    punto = punto + 40;
  } else if (tiempo < 6) {
    punto = punto + 30;
  } else if (tiempo < 6) {
    punto = punto + 20;
  } else {
    punto = punto + 10;
  }

  document.getElementById("punto").innerHTML = punto.toString();
}

function createGameBoard() {
  var gameBoard = document.createElement("div");
  gameBoard.className = "contenedor";
  var shuffledCards = shuffleCards(limpio.concat(limpio));
  gameBoard = document.getElementById("contenedor");
  for (var i = 0; i < shuffledCards.length; i++) {
    var card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    var cardImage = document.createElement("img");
    cardImage.src = shuffledCards[i];
    card.appendChild(cardImage);
    card.addEventListener("click", function () {
      if (firstCard === null) {
        firstCard = this;
        this.childNodes[0].style.display = "block";
      } else if (secondCard === null && this !== firstCard) {
        secondCard = this;
        this.childNodes[0].style.display = "block";
        if (firstCard.childNodes[0].src === secondCard.childNodes[0].src) {
          asignarPunto(tiempoActual - tiempoTranscurrido);
          firstCard = null;
          secondCard = null;
          tiempoActual = tiempoTranscurrido;
          parCarta++;
        } else {
          setTimeout(function () {
            firstCard.childNodes[0].style.display = "none";
            secondCard.childNodes[0].style.display = "none";
            firstCard = null;
            secondCard = null;
          }, 500);
        }
      }
    });
    gameBoard.appendChild(card);
  }
}

function iniciar() {
  tiempoTranscurrido = 30;
  document.getElementById("iniciar").style.display = "none";
  document.getElementById("terminar").style.display = "block";
  createGameBoard();
}

function terminar() {
  document.getElementById("iniciar").style.display = "block";
  document.getElementById("terminar").style.display = "none";
  punto = 0;
  document.getElementById("punto").innerHTML = punto.toString();
  document.getElementById("tiempo").innerHTML = "00:30";
  var contador = 0;
  clearInterval(intervalo);
  while (true) {
    contador++;
    document
      .getElementById("contenedor")
      .removeChild(document.getElementById("card"));
    if (contador == 16) {
      break;
    }
  }
}

function lanzarModal(txt, link) {
  document.getElementById("mensaje").innerHTML = txt;
  var imgCard = document.getElementById("img-resultado");
  imgCard.src = link;
  var modal = document.getElementById("modal");
  var body = document.getElementsByTagName("body")[0];
  var cardPuntos = document.getElementsByClassName("card-punto");
  modal.style.display = "block";

  body.style.position = "static";
  body.style.height = "100%";
  body.style.overflow = "hidden";

  for (let i = 0; i < listaPuntos.length; i++) {
      cardPuntos[i].innerHTML = listaPuntos[i].toString();
      if(i ===3 ) break
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";

      body.style.position = "inherit";
      body.style.height = "auto";
      body.style.overflow = "visible";
    }
  };
}

document.getElementById("iniciar").addEventListener("click", function () {
  intervalo = setInterval(actualizarCronometro, 1000);
});

function lanzarMusica() {
  audio = document.createElement("audio");
  audio.src = "../../../resources/music-fondo.mpeg"
  audio.play(); 
  audio.volume = 0.02;
  audio.loop = true;
}



lanzarMusica();
