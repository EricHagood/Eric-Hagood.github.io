let deckID = '';
let playerArray = [{name: 'west', points: 0}, {name: 'north', points: 0}, {name: 'east', points: 0}, {name: 'south', points: 0}];
let trick = [{}, {}, {}, {}];
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
    $('#rulesButton').on('click', (event)=>{
        $('.modal').css('display', 'block');
        $(event.currentTarget).removeClass('rulenavStart').addClass('rulenav');
    })
    $('#close').on('click', ()=>{
        $('.modal').css('display', 'none');
    })
    // $('.playerCard').on('click', play);
    });
//////////////
///This function draws 13 cards into each of the players hands.
//////////////
function draw(){
    $('.draw').hide();
    $('.northCard').css('display', 'inline-block');
    $('.westCard').css('display', 'flex');
    $('.eastCard').css('display', 'flex');
        $.ajax({
        url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=52',
        // type: 'GET',
        }).then((drawnCards)=>{
            for (let i = 0; i < playerArray.length; i++){
                playerArray[i].cards = [];//This line of code is present to empty the array when the shuffling the deck
                playerArray[i].cards = drawnCards.cards.splice(0, 13);
                console.log(playerArray[i]);
            }
            console.log(checkStart());
            appendCards(3);
            console.log("broken out of the append method");
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
        let img = "<img src=" + playerArray[playerNum].cards[i].image + ' id=' + playerArray[playerNum].cards[i].code + " class= playerCard>";
        //I was having issues with jquery and setting the id to the image and not the div so I decided to do it this way.
        //I also couldn't append a class as seen in the next line I commented out so hard coding it is.
        // $(img).addClass('playerCard');
        $('.' + playerArray[playerNum].name).append(img);
    }
    // $('.playerCard').on('click', play);
}

////////////////////
///This functin is meant to handle the logic of when a plyer clicks on a card.
////////////////////
function play(event){
    //TODO: Add logic for handling clicked cards as well as checking to see if the card clicked is a legal play
    console.log("This does work");
    console.log(event);
    $(event.currentTarget).remove();
    let str = $(event.currentTarget).attr('id');
    $('.trick').append(event.currentTarget);
    moveToTrick(str, 3);
}

////////////////////
///This function takes the card code and the player number in the array and moves the played card from the players hand and into the current trick
////////////////////
function moveToTrick(cardCode, player){
    console.log(trick);
    for (let i = 0; i < playerArray[player].cards.length; i++){
        if (playerArray[player].cards[i].code === cardCode){
            trick[player].card = playerArray[player].cards[i];
            trick[player].name = playerArray[player].name;
            playerArray[player].cards.splice(i, 1);
            console.log(playerArray);
        }
    }
}
//This function did not work and was honestly dumb.
// function aiCards(){
//     console.log("aiCards function called");
//     for(let i = 0; i < 3; i++){
//         for (let j = 0; j < 13; j++){
//             let img = "<img src='img/playing-card-back.jpg' class=" + playerArray[i].name + "Cards >";
//             $('.'+ playerArray[i]).append(img);
//         }
//     }
// }
////////////////////
///This function will be run at the start of every round to find which player has the two of clubs and starts the trick
////////////////////
function checkStart(){
    for (let x = 0; x < playerArray.length; x++){
        for (let y = 0; y < 13; y++){
            if (playerArray[x].cards[y].code == '2C'){
                return playerArray[x].name;
            }
        }
    }
}


////////////////////
///
////////////////////