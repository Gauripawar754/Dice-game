
//selecting element 
const player0El=document.querySelector('.player--0')
const player1El=document.querySelector('.player--1')
const score0El= document.querySelector('#score--0')
const score1El= document.querySelector ('#score--1')
const diceEl= document.querySelector('.dice')
const current0El=document.querySelector('#current--0')
const current1El=document.querySelector('#current--1')
const btnNew=document.querySelector('.btn--new')
const btnRoll=document.querySelector('.btn--roll')
const btnHold=document.querySelector('.btn--hold')
const winnerLabel = document.querySelector('.Winner-Labal');
const winnerPlayerEl = document.querySelector('#winner-player');
const btnModal=document.querySelector('.btn-modal')
const overlay=document.querySelector('.overlay')
const diceSound = new Audio('dice-roll.mp3'); // Load the dice roll sound
const confetti=document.querySelector('#confetti')
const btnMute=document.querySelector('.btn-mute')


// for hiddding modal window on click ok button

btnModal.addEventListener( 'click', function(){
  overlay .classList.add('hidden')})

// Function to toggle mute state
 let isMuted=false; // unmuted
btnMute.addEventListener('click', function() {
  isMuted = !isMuted;  //muted   //Toggle mute state

  if (isMuted) {
      diceSound.muted = true;  // Mute the sound
      btnMute.textContent = '🔇';  // Change button icon to muted (🔇)
  } else {
      diceSound.muted = false; // Unmute the sound
      btnMute.textContent = '🔊';  // Change button icon to sound on (🔊)
  }
})

//starting condition
confetti.classList.add('hidden'); //hides confetti initialy
winnerLabel.classList.add('hidden');  // Hide the winner label initially
diceEl.classList.add('hidden');
score0El.textContent=0;
score1El.textContent=0;
let playing=true;


const score=[0,0]
let currentScore=0
let activePlayer=0


 const switchPlayer= function(){
  document.getElementById(`current--${activePlayer}`).textContent=0
activePlayer=activePlayer === 0 ? 1 : 0
currentScore = 0
player0El.classList.toggle('player--active')
player1El.classList.toggle('player--active') }



//rolling dice functionality
btnRoll.addEventListener( 'click', function(){
      
    if (playing) {

  // Play the dice roll sound effect
  diceSound.play();
    //genarate random rolling dice
    const dice=Math.trunc (Math.random()*6)+1
 
    //displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`

    if (dice !== 1){
       // if not 1 then add to current score
        currentScore=currentScore + dice
       document.getElementById(`current--${activePlayer}`).textContent=currentScore
    }
    else{
        //  switch to next player
       switchPlayer()
    }
  }
})


// hold buttton functionality
btnHold.addEventListener('click', function() {
     
   if (playing){
  
    //add current score to activeplayer score
    score[activePlayer]=score[activePlayer] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];

   if (score[activePlayer] >=100){

    //finish game
   playing=false

    // Update the winner label with the active player's number
            winnerPlayerEl.textContent = activePlayer + 1;  // Player 1 or Player 2
            winnerLabel.classList.remove('hidden');  // Show the winner label
       document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        confetti.classList.remove('hidden'); //shows confetti on winning
   }       
    else{
         //switch to next player
    switchPlayer()
    }

  }
})
 
// new button functionality
btnNew.addEventListener('click', function(){

    currentScore=0;
    activePlayer=0;
    current1El.textContent=0;
    current0El.textContent=0;
    score0El.textContent=0;
    score1El.textContent=0;
    overlay.classList.remove('hidden');
    diceEl.classList.add ('hidden');
    winnerLabel.classList.add('hidden');  // Hide the winner label on reset
    player0El.classList.remove('player--winner', 'player--active');
    player1El.classList.remove('player--winner', 'player--active' );
    player0El.classList.add('player--active');
    confetti.classList.add('hidden');
    playing=true;
}
)
