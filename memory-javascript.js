//SELECT CARDS AND PLACE INSIDE VARIABLE
const cardGroup = document.querySelectorAll(".flip-card");
let movesBoard = document.querySelector(".movesBoard");
let completeMatch = document.querySelector(".matches");
let congrats = document.getElementById("congrats");
let timer = document.querySelector(".timer");

let flippedCard = false; //Check for card flip
let boardLock = false; //Locks the board for unnecessary actions
let firstCard, secondCard; //Identifying front face and back face of a card
let moves = 0;
let cardWon = 0;

//SETUP FOR TIMER
let second = 0, minute = 0; hour = 0;
let interval;

//CONGRATULATIONS POPUP
let modal = document.getElementById("congrats");

//CLOSE POPUP BUTTON
let closebtn = document.querySelector(".close-btn");

//PLAY AGAIN POPUP BUTTON
let play = document.getElementById("play-again");

//RESET BUTTON
let resetbtn = document.getElementById("reset-btn");

//CARD FLIP FUNCTION
function cardFlip(){
	if (boardLock) return; //Finishes the card flip process before continuing with another set of cards

	if (this === firstCard) return; //If the current card is the first card clicked, return the value to true. If second card is clicked, it will stay to second card until process is done.

	this.classList.add("flip"); //This element starts the event by accessing the classList of the flip-card.

	if(!flippedCard){
		//For the first click.
		flippedCard = true;
		firstCard = this;

		startTimer();
		return; //Returns true.
	}
		//For the second click.
		secondCard = this;

		movesBoard.textContent = ++moves; //Increase the number of moves by 1.
		cardMatch(); //Function for card match.
}
//CARD FLIP FUNCTION

//CARD MATCH CONDITION - using data attributes
function cardMatch(){
	if(firstCard.dataset.images === secondCard.dataset.images){
		//If it is a match - cards stay flipped
		firstCard.removeEventListener("click", cardFlip);
		secondCard.removeEventListener("click", cardFlip);

		matchSound(); //Add match sound effect
		resetBoard(); //Resets the card flip

		let testcompleteall = ++cardWon; //Increase match pair by 1

		completeMatch.textContent = testcompleteall; //Takes the value of matches into testcompleteall

		setTimeout(function(){
			if(testcompleteall == 6){
				clearInterval(interval); //Stops the timer
				congratulations(); //Show the congratulatory popup modal
			}
		}, 1000);
	}else{
		boardLock = true; //Unlock the game after finishing the click process
		//IF NOT A MATCH
		setTimeout(function(){
			firstCard.classList.remove("flip");
			secondCard.classList.remove("flip");

			unmatchSound(); //Add the not a match sound effect
			resetBoard(); //Resets the card flip
		}, 1000);
	}
}
//CARD MATCH CONDITION - using data attributes

//TIMER FUNCTION
function startTimer(){
	clearInterval(interval); //Clears the timer after each time to avoid glitching
	interval = setInterval(function() {
		timer.innerHTML = minute+" mins "+second+" secs";
		second++;

		if(second == 60){
			second = 0;
			minute++;
		}
	}, 1000);
}
//TIMER FUNCTION

//RESETS FOR CLICK SELECTION AFTER EACH CARD PAIR
function resetBoard(){
	flippedCard = false;
	boardLock = false;
	firstCard = null;
	secondCard = null;
}
//RESETS FOR CLICK SELECTION AFTER EACH CARD PAIR

//RESET BUTTON
resetbtn.addEventListener("click", function(){
	location.reload();
});
//RESET BUTTON

//TO SHUFFLE THE CARDS
(function shuffler(){
	cardGroup.forEach(function(cardUnit){
		let randPosition = Math.floor(Math.random() * 12);
		cardUnit.style.order = randPosition;
	});
})(); //INITIALLY SHUFFLES THE CARDS BEFORE START //IIFE - The function will be executed right after its defintiion.
//TO SHUFFLE THE CARDS

//TO LOOP ON EACH CARD
cardGroup.forEach(function(cardUnit){
	cardUnit.addEventListener("click", cardFlip);
});
//TO LOOP ON EACH CARD

//SOUND EFFECTS
//Match cards - Sound
function matchSound(){
	let cardMatchSound = new Audio("audio/fairy-sparkle.mp3");
	cardMatchSound.play();
}

//Not match cards - Sound
function unmatchSound(){
	let cardNotMatch = new Audio("audio/wood-hard-hit.mp3");
	cardNotMatch.volume = 0.5; //50% volume
	cardNotMatch.play();
}

//Game complete - Sound
function gameCompletes(){
	let gameComplete = new Audio("audio/arcade-game-complete.mp3");
	gameComplete.play();
}
//SOUND EFFECTS

//CONGRATULATIONS MESSAGE ONCE COMPLETE MATCHES = 6
function congratulations(){
	modal.classList.add("show"); //Show modal popup.
	totalTime = timer.innerHTML;
	gameCompletes(); //Add game is complete sound.

	document.getElementById("finalMove").innerHTML = moves;
	document.getElementById("finalTime").innerHTML = totalTime;

	closePopup();
	playAgain();
}
//CONGRATULATIONS MESSAGE ONCE COMPLETE MATCHES = 6

//CLOSING THE POPUP MODAL
function closePopup(){
	closebtn.addEventListener("click", function(e){
		modal.classList.remove("show");
	});
}
//CLOSING THE POPUP MODAL

//PLAY AGAIN BUTTON IN POPUP MODAL
function playAgain(){
	play.addEventListener("click", function(e){
		location.reload();
	});
}
//PLAY AGAIN BUTTON IN POPUP MODAL