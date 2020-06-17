let deckID = '';
let playerArray = [{name: 'north', points: 0}, {name: 'east', points: 0}, {name: 'player', points: 0}, {name: 'west', points: 0}];
////////////////////
///On load function. Loads in API after page has fully loaded to avoid any possible appending erorrs
////////////////////
$(()=>{
    ///Creates the deck and gets the unique deck ID to be used in the rest of the program
    function getDeck(){
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        }).then((deckData) =>{
            // console.log('this section works');
            deckID = deckData.deck_id;
            // console.log(deckData.deck_id);
            // console.log(deckID);
        }), (error) =>{
            console.error(error);
        }
    }
    getDeck();
    $('.draw').on('click', draw);
    $('.shuffle').on('click', shuffle);
    });
//////////////
///This function draws 13 cards into each of the players hands.
//////////////
function draw(){
    for (let i = 0; i < playerArray.length; i++){
        $.ajax({
        url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=13',
        // type: 'GET',
        }).then((drawnCards)=>{
            playerArray[i].cards = [];//This line of code is present to empty the array when the shuffling the deck
            playerArray[i].cards = drawnCards.cards;
            console.log(playerArray[i]);
            
        }), (error) =>{
            console.error(error);
        }
    }
}//On multiple clicks the deck is empty so the hand is overwritten and becomes empty
//TODO: Fix this by either removing the draw button or creating logic to check if hand is still in play and to not deal again.

////////////////////
///This function shuffles the cards so that a new hand can be dealt to the players
////////////////////
function shuffle(){
    console.log('shuffle function called');
    $.ajax({
        url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/'
    }).then((shuffledCards)=>{
        console.log(shuffledCards.success);
        draw();
    }), (error) =>{
        console.error(error);
    }
}