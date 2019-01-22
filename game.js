
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

function Dealer (score, hand, name){
    this.score = score;
    this.hand = [];
    this.name = "Dealer";
}

function Card (value, suit, name){
	this.value = value;
  this.suit = suit;
  this.name = name;
}//card object

function Deck(){
 this.cards = [];
 this.createCards();
};

Deck.prototype = {
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
  
  {this.cards.sort(function(a, b){return 0.5 - Math.random()});}
}; 

let newDeck = new Deck();
let player = new Player(0, [],"player");
let dealer = new Dealer(0, [], "dealer");

 

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
  $("#walletValue").html("$"+wallet);
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
  wager = parseInt(document.getElementById('betBox').value, 10);
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

let shuffleBox = () =>{
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
  player.hand.push(newDeck.cards.pop())
  player.hand.push(newDeck.cards.pop())
  dealer.hand.push(newDeck.cards.pop())
  dealer.hand.push(newDeck.cards.pop())
  $("<div>"+player.hand[0].name+" of "+player.hand[0].suit+"</div>").appendTo("#playerCards"); 
 $("<div>"+player.hand[1].name+" of "+player.hand[1].suit+"</div>").appendTo("#playerCards"); 
  $("<div>"+dealer.hand[0].name+" of "+dealer.hand[0].suit+"</div>").appendTo("#dealerCards"); 
 $("<div id = 'secondCard'>?</div>").appendTo("#dealerCards"); 
  newDeck.cards = newDeck.cards.slice(4);
  player.score = getScore(player.hand)
  console.log(player.score);
  dealer.score = getScore(dealer.hand);
  checkBlackJack(player.score);
}
 $("#hit").click(function(){
  cardCount++
  player.hand.push(newDeck.cards.pop())
  dealer.hand.push(newDeck.cards.pop())
$("<div>"+player.hand[cardCount].name+" of "+player.hand[cardCount].suit+"</div>").appendTo("#playerCards"); 
 player.score =  getScore(player.hand)
  $("#yourScore").html("<p>"+player.score+"</p>");
  checkBust();
 console.log(player.score+"   snd    " +dealer.score)
  
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
 $("#secondCard").html("<div>"+dealer.hand[1].name+" of "+dealer.hand[1].suit+"</div>")  
  checkBlackJack(dealer.score)
  dealersTurn(); 
  console.log(dealer.hand)

      
 $("#theirScore").html(dealer.score); 
 
});
  

let getScore = (arr) => {
  let score = 0;
  let aceCount = 0;
  for(let i = 0; i < arr.length; i++){
    score += arr[i].value; 
    if (arr[i].value == 1) {
      aceCount++; 
    }
  }
  if(aceCount >0){
    for(let j = 0; j <= aceCount; j++){
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
  
  dealerStands = true;
  }
 
  while(dealer.score <= 17) {
    index++;
    // dealer.score = getScore(dealer.hand);
    dealer.hand.push(newDeck.cards.pop());
    dealer.score+=dealer.hand[index].value;
    $("<div>"+dealer.hand[index].name+" of   "+dealer.hand[index].suit+"</div>").appendTo("#dealerCards");  
    //dealer.score = getScore(dealer.hand);
   
  }
window.setTimeout(checkScore, 1500);
 // checkBust();
}
let checkScore=() => {
  
  if (dealer.score > 17){
    if(dealer.score > player.score){
      if(dealer.score <= 21){
        alert("Dealer wins with "+dealer.score)
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

