let deckID = '';
let playerArray = [{name: 'north', points: 0}, {name: 'east', points: 0}, {name: 'south', points: 0}, {name: 'west', points: 0}];
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
        $.ajax({
        url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=52',
        // type: 'GET',
        }).then((drawnCards)=>{
            for (let i = 0; i < playerArray.length; i++){
                playerArray[i].cards = [];//This line of code is present to empty the array when the shuffling the deck
                playerArray[i].cards = drawnCards.cards.splice(0, 13);
                console.log(playerArray[i]);
            }
            appendCards(2);
        }), (error) =>{
            console.error(error);
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
    }), (error) =>{
        console.error(error);
    }
}
////////////////////
///This function will append the card images to the players hand.
////////////////////
function appendCards(playerNum){
    console.log('appendCards function called');
    for (let i = 0; i < 13; i++){
        let img = "<img src=" + playerArray[playerNum].cards[i].image + ' id=' + playerArray[playerNum].cards[i].code + '>';
        //I was having issues with jquery and setting the id to the image and not the div so I decided to do it this way.
        $('.' + playerArray[playerNum].name).append(img);
    }
}



////////////////////
///
////////////////////