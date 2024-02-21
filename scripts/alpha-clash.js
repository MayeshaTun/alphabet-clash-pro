//1st rules

/*function play(){
    // step-1: hide the screen.to hide the screen add the class hidden to the home section
    const homeSection = document.getElementById('home-screen');
    homeSection.classList.add('hidden');
    //console.log(homeSection.classList);

    //show the playground
    const playgroundSection = document.getElementById('play-ground');
    playgroundSection.classList.remove('hidden');
    //console.log(playgroundSection.classList);
}*/
//---------------------------------------------------------------//

const audio = new Audio();

let isGamePlayOn = false;

const artBoard = document.getElementById("art-board");
const modalBox = document.getElementById("modal-box");

function handleKeyboardKeyUpEvent(event) {
  if (isGamePlayOn == false) return;
  const playerPressed = event.key;
  //console.log("play pressed", playerPressed);

  //stop the game if pressed 'Esc'//
  if (playerPressed === "Escape") {
    gameOver();
  }

  //key play is expected to press//
  const currentAlphabetElement = document.getElementById("current-alphabet");
  const currentAlphabet = currentAlphabetElement.innerText;
  const expectedAlphabet = currentAlphabet.toLowerCase();

  //check right or wrong key pressed
  if (playerPressed === expectedAlphabet) {
    console.log("You get a point!");

    audio.src = "../audio/success.mp3";
    audio.play();
    const currentScore = getTextElementValueById("current-score");
    const updatedScore = currentScore + 1;
    setTextElementValueById("current-score", updatedScore);

    //------------------------------------------
    // update score://
    //1.get the current score//
    //const currentScoreElement = document.getElementById("current-score");
    //const currentScoreText = currentScoreElement.innerText;
    //const currentScore = parseInt(currentScoreText);

    //2.increase the by 1//
    //const newScore = currentScore + 1;
    //3.show the updated score//
    //currentScoreElement.innerText = newScore;

    //start a new round
    removeBackgroundColorById(expectedAlphabet);
    continueGame();
  } else {
    console.log("you missed. you lost a life");

    audio.src = "../audio/error.mp3";
    audio.play();

    const currentLife = getTextElementValueById("current-life");
    const updatedLife = currentLife - 1;

    const updatedLifePercentage = (updatedLife / 5) * 100;

    artBoard.style.background = `linear-gradient( #FFFFFFB3 ${updatedLifePercentage}%,red)`;

    setTextElementValueById("current-life", updatedLife);

    if (updatedLife === 0) {
      gameOver();
    }

    //step:1 get the current life number//
    //const currentLifeElement = document.getElementById("current-life");
    // const currentLifeText = currentLifeElement.innerText;
    // const currentLife = parseInt(currentLifeText);

    //step:2 reduce the life count//
    //const newLife = currentLife - 1;

    //step:3 display the updated life count//
    //currentLifeElement.innerText = newLife;
  }
}
// capture keyboard key press
document.addEventListener("keyup", handleKeyboardKeyUpEvent);

function continueGame() {
  //step -1: generate a random alphabet
  const alphabet = getARandomAlphabet();
  //console.log('Your random alphabet', alphabet);

  //set randomly generated alphabet to the screen (show it)
  const currentAlphabetElement = document.getElementById("current-alphabet");
  currentAlphabetElement.innerText = alphabet;

  //set background color
  setBackgroundColorById(alphabet);
}

function play() {
  //hide everything show only the playground
  hideElementById("home-screen");
  hideElementById("final-score");
  showElementById("play-ground");

  //rest score and life
  setTextElementValueById("current-life", 5);
  setTextElementValueById("current-score", 0);

  isGamePlayOn = true;

  continueGame();
}
function gameOver() {
  hideElementById("play-ground");
  showElementById("final-score");

  //update: get the final score
  const lastScore = getTextElementValueById("current-score");
  setTextElementValueById("last-score", lastScore);

  //clear the last selected alphabet highlight//
  const currentAlphabet = getElementTextById("current-alphabet");
  removeBackgroundColorById(currentAlphabet);

  isGamePlayOn = false;

  artBoard.style.background = "linear-gradient( #FFFFFFB3 100%,red)";
}

//modal
function modalOpen(event) {
  if (event.clientY < 20) {
    modalBox.style.display = "flex";
  }
}

function modalClose() {
  modalBox.style.display = "none";
}

document.body.onmousemove = modalOpen;
