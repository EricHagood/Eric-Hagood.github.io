let deckID = '';
let playerArray = [{name: 'north', points: 0}, {name: 'east', points: 0}, {name: 'player', points: 0}, {name: 'west', points: 0}];
$(()=>{
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
function draw(){
    $.ajax({
    url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=13',
    // type: 'GET',
    }).then((drawnCards)=>{
        for (let i = 0; i < playerArray.length; i++){
            playerArray[i].cards = drawnCards.cards;
            console.log(playerArray[i]);
        }
        
    }), (error) =>{
        console.error(error);
    }
}