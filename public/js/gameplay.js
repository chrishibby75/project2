dialogue = require('./scene')
var turn = 0

var encounterChance = Math.random()


switch(turn){
    case 0:
    dialogue[turn]
    break;

    case (turn %2 !=0 && turn !=9):
    dialogue[4]
    turn ++
    break;

    case (turn%2 ===0 ):
    dialogue[3]
    encounter()
    turn ++
    break;
}

encounter = () => {
    if (encounterChance < 0.33333) {
        turn ++
        return dialogue[5]
    }
    else if (encounterChance < 0.6666) {
        turn ++
        return dialogue[6]
    }
    else {
        ///////////MAKE THE AJAX CALL!!!!!!!!!!!!
        hp = 40
        turn ++
        return dialogue[7]
    }
}