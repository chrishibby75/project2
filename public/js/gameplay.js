var dialogue = [
    "You have lost your lover. However there is a way to bring her back. Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Welcome to my shop! What can I get you?",
    "Bandits attack!",
    "What do you want to do?",
    "You narrowly escaped the bandits!",
    "You escaped the bandits and grabbed 300 gold!",
    "The bandits beat you up you lost 40 HP",
    "What do you want to do?"
];

///front end javascript logic

//function for video game text
var showText = function (target, message, index, interval) {   
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
  }
var id = $("#characterName").data('name')


var encounterChance = Math.random()
$(document).ready(function () {
$("#shop").hide();
$('#items').hide();
$('#buy').on('click', function(){
    $('#items').show()
    $("#buy").hide()
})
    var turn = 0
    $("#next").on("click", function () {
        $('#msg').empty();
        gameboi(turn, turn++);
        console.log(turn);
        

    })

    $(function () {
        showText("#msg", dialogue[turn], 0, 100);   
      })
    

    function gameboi(turn) {
        switch (turn) {
            case 0:
            $(function () {
                showText("#msg", dialogue[turn], 0, 100);   
              })
                //buttons that on click change tthe turn ++ 
                
                break;
            case 1:
            $(function () {
                $('#shop').show()
                $('#next').hide()
                showText("#msg", dialogue[4], 0, 100);   
              })
                
                break;
                
              case 3:
              $("#textbox").html(dialogue[4]) 
              break; 


            case 2:
                $("#textbox").html(dialogue[3])
                encounter()

                break;
            case 9:
                endGame()
                break;
        }

        console.log(turn)
    }
})
encounter = (assets, hungry) => {
    if (!assets, !hungry) {
        if (encounterChance < 0.33333) {

            $("#textbox").html(dialogue[5])
        } else if (encounterChance < 0.6666) {
            getGold()
           
        } else {
            //if they end up taking damage
            takeDamage()
           
        }
    } else if (assets) {
        if (encounterChance < 0.6) {
            turn++
            //escape
            $("textbox").html(dialogue[5])
        } else {
            turn++
            $("textbox").html(dialogue[6])
        }
    } else if (hungry) {
        if (encounterChance < 0.6) {
            turn++
            $("#textbox").html(dialogue[5])
        } else {
            turn++
            $("#textbox").html(dialogue[7])
        }
    }
    return
}
getGold = function(){
    var id = $('#characterName').data('name')
    $.ajax('/character/gold/' + id, {
        type: 'PUT'
    }).then( $('#textbox').html(dialogue[6]))
    
}
takeDamage = function(){
    var id = $("#characterName").data('name')
    $.ajax('/character/hp/' + id, {
        type: 'PUT',
        hp: 'no'
        


    }).then($("#textbox").html(dialogue[7]));
    
}