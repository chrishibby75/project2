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
var encounterChance = Math.random()
var showText = function (target, message, index, interval) {
    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(function () {
            showText(target, message, index, interval);
        }, interval);
    }
}
var id = $("#characterName").data('name')
$(document).ready(function () {
    var turn = parseInt($("#turn").data('turn'))
    $("#adventure").hide();
    $("#shop").hide();
    $('#items').hide();
    $("#run").hide();
    $("#useWeapon").hide()
    $('#buy').on('click', function () {
        $('#items').show()
        $("#buy").hide()

    })
    gameboi(turn)

    $("#next").on("click", function () {
        turn++
        $('#msg').empty();

        gameboi(turn, updateTurn());
        console.log(turn)

    })

    //  showText("#msg", dialogue[turn], 0, 100);   



    function gameboi(turn) {
        console.log('yeppers this is the turn' + turn)
        switch (turn) {
            case 0:
                $(function () {
                    showText("#msg", dialogue[turn], 0, 75);
                    turn++

                })
                //buttons that on click change tthe turn ++ 

                break;
            case 1:
                $(function () {
                    $("#adventure").show()
                    $('#shop').show()
                    $('#next').hide()
                    showText("#msg", dialogue[4], 0, 100);
                })

                break;
            case 2:
                showText("#msg", dialogue[3], 0, 100);
                //encounter()
                break;

            case 3:
                $("#textbox").html(dialogue[4])
                break;



            case 9:
                endGame()
                break;
        }

        $("#adventure").on("click", function () {
            console.log(turn)
            turn++
            $("#adventure").hide()
            $("#msg").empty()
            $("#shop").hide()
            $("#useWeapon").show();
            $("#run").show()
            $('.gameCont').css("background-image", "url('/imgf/insideCave.jpg')")
            console.log(turn)


            gameboi(turn, updateTurn())
        })
    }

    updateTurn = function () {
        //turn++
        var id = $("#characterName").data('name')
        $.ajax('/turnUpdate/' + id + "/" + turn, {
            type: 'PUT',

        }).then()
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
timeboi = function () {
    var time = 0
    console.log('timeboi')
    time++
}
getGold = function () {
    var id = $('#characterName').data('name')
    $.ajax('/character/gold/' + id, {
        type: 'PUT'
    }).then($('#textbox').html(dialogue[6]))

}
takeDamage = function () {
    var id = $("#characterName").data('name')
    $.ajax('/character/hp/' + id, {
        type: 'PUT',
        hp: 'no'



    }).then($("#textbox").html(dialogue[7]));

}