
let wager;
let stands;
let cardCount;
let index;
let placedBet;
let dealerIsDone;
let wallet = 1000;
let weHaveAwinner;
function Player (score, hand, name){ //player constructor
  this.score = score;
  this.hand =[];
  this.name = "Player";
}

function Dealer (score, hand, name){ //dealer constructor
    this.score = score;
    this.hand = [];
    this.name = "Dealer";
}

function Card (value, suit, name){//card constructor
	this.value = value;
  this.suit = suit;
  this.name = name;
}

function Deck(){ //deck constructor
 this.cards = [];
 this.createCards();
};

Deck.prototype = {//create a standard 52-card deck and assign names, values and suits
createCards: function() {  

let cardValues = [[2,"2"],[3,"3"],[4,"4"], [5,"5"], [6,"6"], [7,"7"],[8,"8"], [9, "9"], [10, "10"], [10,"jack"], [10, "queen"], [10, " king"],[1,"ace"]]
let suits = ['clubs', 'diamonds', 'hearts', 'spades']
   

for (let i = 0; i < cardValues.length; i++) {
    for (let k = 0; k < suits.length; k++) {
      this.cards.push(new Card(cardValues[i][0], suits[k], cardValues[i][1]))
     }
    
    } return this.cards;
  },
  
  shuffle: function()
  
  {this.cards.sort(function(a, b){return 0.5 - Math.random()});} //randomize the cards -- a.k.a. shuffle
}; 

let newDeck = new Deck();//new deck
let player = new Player(0, [],"player");//player (YOU)
let dealer = new Dealer(0, [], "dealer");//dealer

 

let play = () =>{
  weHaveAwinner = false;
  dealerIsDone = false;
  $("#hit").hide();
  $("#stand").hide();
  $("#dealerCards").html("");
  $("#playerCards").html("");
  $("#walletValue").html("");
  player.hand = [];
  dealer.hand = [];
  placedBet = false;
  newDeck = new Deck();
  player.score = 0;
  cardCount = 1;
  $("#yourScore").html("");
    $("#theirScore").html("");
  $("#walletValue").html("$"+wallet); //show the value of the wallet on the screen
  $("#walletValue").show();
  $("#headerID").hide();
  $("#play").hide();
  $("#betBox").show();
  $("#betButton").show();
  $("#walletPrefix").show();
  $("#title").show();
  $("#again").hide();

} 
let bet = ()=> {
  wager = parseInt(document.getElementById('betBox').value, 10); //accept the user's bet input as long as its a number > 0 and < wallet value
 if(isNaN(wager)){
    alert("Please enter a number!")
  }
  else if (wager>= wallet){
    alert("You don't have that much money!")
  }
  else if(wager <=0){
    alert("Minimum bet is $1!")
  }
  else{
wallet = wallet - wager;
  placedBet = true;
  $("#walletValue").html("$"+wallet)  
    $( ".bet" ).hide();
  
  }
  shuffleBox();
 
  playAgain();
};

let shuffleBox = () =>{ //show the shuffling message and shuffle the deck, then deal
if(placedBet === true){
 newDeck.shuffle();
$('#shuffleDiv').show();
$("#shuffleDiv").delay(1500).fadeOut("slow");
 deal();
}   
}

let deal = () => { 
 newDeck.shuffle();
  $("#hit").show();
  $("#stand").show();
  player.hand.push(newDeck.cards.pop())//push the first two cards to the player
  player.hand.push(newDeck.cards.pop())//push the first two cards to the player
  dealer.hand.push(newDeck.cards.pop())//push the first two cards to the dealer
  dealer.hand.push(newDeck.cards.pop())//push the first two cards to the dealer
  $("<div>"+player.hand[0].name+" of "+player.hand[0].suit+"</div>").appendTo("#playerCards"); //show the card names and suits 
 $("<div>"+player.hand[1].name+" of "+player.hand[1].suit+"</div>").appendTo("#playerCards"); 
  $("<div>"+dealer.hand[0].name+" of "+dealer.hand[0].suit+"</div>").appendTo("#dealerCards"); 
 $("<div id = 'secondCard'>?</div>").appendTo("#dealerCards"); 
  newDeck.cards = newDeck.cards.slice(4); //slice the 4 initial cards off the deck 
  player.score = getScore(player.hand) //calculate the score of the player
  console.log(player.score);
  dealer.score = getScore(dealer.hand);//calculate the score of the dealer 
  checkBlackJack(player.score); //check for blackjack on the player's hand 	
}
 $("#hit").click(function(){
  cardCount++ //keep track of how many cards have been drawn so it can update the list 	
  player.hand.push(newDeck.cards.pop())
  dealer.hand.push(newDeck.cards.pop())
$("<div>"+player.hand[cardCount].name+" of "+player.hand[cardCount].suit+"</div>").appendTo("#playerCards"); //display last-drawn card
 player.score =  getScore(player.hand)
  $("#yourScore").html("<p>"+player.score+"</p>");
  checkBust(); //check for a bust
 console.log(player.score+"   and    " +dealer.score)
  
});


let checkBlackJack = (score)=> {
  
  if (cardCount === 1 && score === 21){
    alert("BLACKJACK!");
   winMoney();
    weHaveAwinner = true;
  } 
  playAgain();
  }


$("#stand").click(function(){
 $("#secondCard").html("<div>"+dealer.hand[1].name+" of "+dealer.hand[1].suit+"</div>")  //show the dealer's second card
  checkBlackJack(dealer.score) //check for dealer blackjack
  dealersTurn(); //dealer will play
  console.log(dealer.hand)

      
 $("#theirScore").html(dealer.score); 
 
});
  

let getScore = (arr) => {
  let score = 0; //total score 
  let aceCount = 0; //track aces
  for(let i = 0; i < arr.length; i++){
    score += arr[i].value; //add every card's value to the score variable
    if (arr[i].value == 1) {
      aceCount++; //increment the aceCount every time an ace is found
    }
  }
  if(aceCount >0){ //if there are aces
    for(let j = 0; j <= aceCount; j++){ //check if the score is <=11 for each ace, and add 10 each time it returns true
      if (score <= 11){
        score+=10;
      }
    }
  }
return score;
} 
//

  

//

let dealersTurn = () => {
 //dealer.score = getScore(dealer.hand);
 let dealerStands = false;
  index = 1;
  if (dealer.score > 17) {
  //stand on >=17
  dealerStands = true;
  }
 
  while(dealer.score <= 17) {
    index++; //track the index
    // dealer.score = getScore(dealer.hand);
    dealer.hand.push(newDeck.cards.pop());
    dealer.score+=dealer.hand[index].value; //update score
    $("<div>"+dealer.hand[index].name+" of   "+dealer.hand[index].suit+"</div>").appendTo("#dealerCards");  //add cards
    //dealer.score = getScore(dealer.hand);
   
  }
window.setTimeout(checkScore, 1500);
 // checkBust();
}
let checkScore=() => {
  
  if (dealer.score > 17){ //if the dealer has more than 17
    if(dealer.score > player.score){ //AND if it's more than the player's score
      if(dealer.score <= 21){ //AND it's less than or === 21, then:
        alert("Dealer wins with "+dealer.score) //dealer wins
     weHaveAwinner = true;
      }
    }   
  }

 if(player.score > dealer.score){
    alert("You Win!");
    winMoney();
    weHaveAwinner = true;
  }
if(player.score === dealer.score && dealer.score!=0){
    alert("Push");
    $("#walletValue").html("$"+ eval(wallet+wager));
    weHaveAwinner = true;
  }
  checkBust();
playAgain();
}


let checkBust = () => {
  
  if(player.score > 21){

    alert("BUST! You got "+player.score);
    weHaveAwinner = true;
  }
  else if (dealer.score > 21){
    alert("Dealer BUSTS with "+dealer.score+"! You win! ");
  winMoney();
    weHaveAwinner = true;
  }
  playAgain();
}


let winMoney = ()=>{
  $("#walletValue").html("$"+(wallet))
  wallet = wallet+wager*2;
}

let playAgain = () =>{
  if (weHaveAwinner){
  $("#stand").hide();
  $("#hit").hide();
  $("#again").show();
  } 
}

