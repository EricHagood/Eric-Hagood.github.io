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
                playerArray[i].cards = drawnCards.cards;
                console.log(playerArray[i]);
            
        }), (error) =>{
            console.error(error);
        }
    }
}