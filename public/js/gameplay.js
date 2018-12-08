dialogue = require('./scene')
var turn = 0

var encounterChance = Math.random()


switch (turn) {
    case 0:
        dialogue[turn]
        break;

    case (turn % 2 != 0 && turn != 9):
        dialogue[4]
        turn++
        break;

    case (turn % 2 === 0):
        dialogue[3]
        encounter()
        turn++
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

            }).then(location.reload());
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