var dialogue = [
    "You have lost your lover. However there is a way to bring her back.",
    "Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Welcome to my shop! What can I get you?",
    "Bandits attack!",
    "What do you want to do?",
    "You narrowly escaped the bandits!",
    "You escaped the bandits and grabbed 300 gold!",
    "The bandits beat you up you lost 40 HP",
    "What do you want to do?"
  ];
var turn = 0

var encounterChance = Math.random()
$(document).ready(function(){
alert('test working')})

switch (turn) {
    case 0:
        dialogue[turn]
        break;

    case (turn % 2 != 0 && turn < 9):
        dialogue[4]
        turn++
        break;

    case (turn % 2 === 0):
        dialogue[3]
        encounter()
        turn++
        break;
    case 9:
       endGame()
       break;
}

encounter = (assets, hungry) => {
    if (!assets, !hungry) {
        if (encounterChance < 0.33333) {
            turn++
            return dialogue[5]
        } else if (encounterChance < 0.6666) {
            turn++
            return dialogue[6]
        } else {
            ///////////MAKE THE AJAX CALL!!!!!!!!!!!!
            $.ajax('/characters/hp/:'+id,{
                type: 'PUT',
                id:id,

            }).then(location.reload('/game'));
            hp = 40
            turn++
            return dialogue[7]
        }
    }
    else if (assets) {
       if (encounterChance < 0.6){
           turn ++
           //escape
           return dialogue[5]
       }
       else{
           turn ++
           return dialogue[6]
       }
    }
    else if (hungry){
        if(encounterChance <0.6){
            turn ++
            return dialogue[5]
        }
        else{
            turn ++
            return dialogue[7]
        }
    } 
}
module.exports = gamePlay()