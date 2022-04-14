let deckId =""
let player1Score = 0 
let player2Score = 0
let round = 0
document.querySelector('.warButton').style.display = 'none';

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deckId = data.deck_id
  document.querySelector('#player1War').style.display = 'none';
  document.querySelector('#player2War').style.display = 'none';
  
})
.catch(err => {
    console.log(`error ${err}`)
});



document.querySelector('.deal2').addEventListener('click', drawTwo)
document.querySelector('.warButton').addEventListener('click', War)


function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
 
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)
        
         
        if (data.remaining == 0 && player1Val > player2Val) {
          document.querySelector('.h3Result').innerText = `Game Over - Player 1 Wins!`;
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
                
        }
        else if (data.remaining == 0 && player1Val < player2Val) {
          document.querySelector('.h3Result').innerText = `Game Over - Player 2 Wins!`;
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
            
        }
        else if( data.remaining == 0 && player1Val == player2Val) {
          document.querySelector('.h3Result').innerText = `Game Over - Tie!`;
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
        }

        else if (player1Val > player2Val) {
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.h3Result').innerText = `Winner - Player 1!`;
          player1Score=player1Score+2
          console.log(player1Score)
          document.querySelector('.p1Score').innerText = `Cards Won - ${player1Score}`
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
          document.querySelector('#player1War').src = ""
          document.querySelector('#player2War').src = ""

        } 
        
        else if (player1Val < player2Val) {
          
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.h3Result').innerText = `Winner - Player 2!`;
          player2Score = player2Score +2
          document.querySelector('.p2Score').innerText = `Cards Won - ${player2Score}`
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
          document.querySelector('#player1War').src = ""
          document.querySelector('#player2War').src = ""
        } 
        
        else if (player1Val == player2Val){
          round = round+1
          document.querySelector('.round').innerText = `Round ${round}`;
          document.querySelector('.h3Result').innerText = `WAR!`;
          document.querySelector('.deal2').style.display = 'none';
          document.querySelector('.warButton').style.display = '';
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
          document.querySelector('#player1War').src = ""
          document.querySelector('#player2War').src = ""

          }
      

        else if (data.remaining == 0){
          document.querySelector('h3').innerText = `No Cards Left in Deck - Game Over`
        }
          
        

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}



function War() {
        document.querySelector('#player1War').style.display = '';
        document.querySelector('#player2War').style.display = '';

          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
          .then(res => res.json())
          fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
 
        
        document.querySelector('#player1War').src = data.cards[0].image
        document.querySelector('#player2War').src = data.cards[1].image
        let player1Val = convertToNum(data.cards[0].value)
        let player2Val = convertToNum(data.cards[1].value)


        if (player1Val > player2Val) {
         
          document.querySelector('.h3Result').innerText = 'War Winner - Player 1!';
          player1Score=player1Score+10
          console.log(player1Score)
          document.querySelector('.p1Score').innerText = `Cards Won - ${player1Score}`
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
          document.querySelector('.deal2').style.display = '';
          document.querySelector('.warButton').style.display = 'none';


        } 
        
        else if (player1Val < player2Val) {
          
          document.querySelector('.h3Result').innerText = 'War Winner - Player 2!';
          player2Score = player2Score +10
          document.querySelector('.p2Score').innerText = `Cards Won - ${player2Score}`
          document.querySelector('.cardsLeft').innerText = `Cards Left in Deck - ${data.remaining}`
          document.querySelector('.deal2').style.display = '';
          document.querySelector('.warButton').style.display = 'none';
          }
        }
      )} 
      

function convertToNum(val) {
  if (val === 'ACE'){
    return 14
  }else if(val === 'JACK'){
    return 11
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'KING'){
    return 13
  }else return Number(val)
}