//all the dialogue in the game
var dialogue = [
    "You have lost your lover. However there is a way to bring them back. Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Welcome to my shop! What can I get you?",
    "Bandits attack!",
    "What do you want to do?",
    "You narrowly escaped the bandits!",
    "You escaped the bandits and grabbed 300 gold!",
    "The bandits beat you up you lost 40 HP",
    "What do you want to do?",
    "You fired a crossbow bolt, grabbed 400 gold from the bandits and escaped!",
    "The crossbow bolt distracted the bandits and you got away"
];
//pictures of different town scenes
var townPics = [
    "/imgf/riften.png",
    "/imgf/sunrise.jpg",
    "/imgf/generalScene.png",
    "/imgf/windhelm.png",
    "/imgf/winterVillage.png"

];
//pictures of the wilderness scenes
var wildPics = [
    "/imgf/dusk.jpg",
    "/imgf/forestPanorama.jpg",
    "/imgf/insideCave.jpg",
    "/imgf/waterCave.jpg",
    "/imgf/wilderness.jpg"
]
//pictures of enemies
var monsters = [
    "/imgf/drowner.png",
    "/imgf/golyat.png",
    "/imgf/assasin.png",
    "/imgf/badguy.png"
]

///front end javascript logic

//function for video game text
var encounterChance = Math.random()
var showText = function(target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function() {
      showText(target, message, index, interval);
    }, interval);
  }
};
var id = $("#characterName").data("name");
$(document).ready(function () {
  var turn = parseInt($("#turn").data("turn"));
  $("#adventure").hide();
  $("#shop").hide();
  $("#items").hide();
  $("#run").hide();
  $("#useWeapon").hide();
  $("#buy").on("click", function() {
    $("#items").show();
    $("#buy").hide()

  });
  gameboi(turn);

  $("#next").on("click", function() {
    turn++;
    $("#msg").empty();
    gameboi(turn, updateTurn());
    
  });

// showText("#msg", dialogue[turn], 0, 100);   

  function gameboi(turn) {
    console.log('yeppers this is the turn' + turn);
    switch (turn) {
    case 0:
        $(function() {
        showText("#msg", dialogue[turn], 0, 75);
        turn++;
                }) 
                break;
            case 1:
               townLoad(0)
               break;
            case 2:
                battleLoad(0)
                break;

            case 3:
                
                townLoad(1);
                
                break;
            case 4:
                battleLoad(1)
                break;
            case 5:
                townLoad(2);
                break;
            case 6:
                battleLoad(2)
                break;
            case 7:
                townLoad(3)
                break;
            case 8:
                battleLoad(3)
                break;
            case 9:
                townLoad(4)
                break;
        }

       
      
    }
    $("#adventure").on("click", function () {
        console.log(turn)
        turn++
        $("#msg").empty()
        console.log(turn)
        gameboi(turn, updateTurn())
    })

    $("#run").on("click", function () {
         encounter(encounterChance);
         $("#useWeapon").hide();
         $("#run").hide();
    })

    $("#useWeapon").on("click", function(){
        var weapon = $("#useWeapon").data("weapon")
        if(weapon == 0){
            alert("You Dont Have Enough Weapons for that!")
        }
        else{
        weapon1 = weapon -1;
        console.log(weapon)
        $("#useWeapon").html("Use Weapon: " +weapon1)
        var id = $("#characterName").data('name')
        $("#msg").empty()
        var encounterChance = Math.random();

        $.ajax('/character/weapons/' + id, {
            type: "PUT"
        }).then(useWeapon(encounterChance))
    }
    })
  
    updateTurn = function () {
        //turn++
        var id = $("#characterName").data('name')
        $.ajax('/turnUpdate/' + id + "/" + turn, {
            type: 'PUT',

        }).then()
    }
})
townLoad = function(num){
    $(function () {
        $("#adventure").show();
        $('#shop').show();
        $('#next').hide();
        $("useWeapon").hide();
        $("#run").hide();
        showText("#msg", dialogue[4], 0, 100);
        $('.gameCont').css("background-image", "url("+ townPics[num] + ")")
    })
};
battleLoad = function(num){
    showText("#msg", dialogue[3], 0, 100);
    $("#adventure").hide();
    $("#shop").hide();
    $("#useWeapon").show();
    $("#run").show();
    $('.gameCont').css("background-image", "url("+ wildPics[num] + ")");
}
encounter = function() {
    var encounterChance = Math.random();
    console.log(encounterChance);
    
    $("#msg").empty();
    $("#next").show();
    if (encounterChance < 0.33333) {
        showText("#msg", dialogue[5], 0, 100);
        return;
    } else if (encounterChance < 0.6666) {
        getGold()
        showText("#msg", dialogue[6], 0, 100);
        return
    } else {
        //if they end up taking damage
        showText("#msg", dialogue[7], 0, 100);
        takeDamage()
        return
    }
}

useWeapon = function(encounterChance){
    if (encounterChance < 0.65){
        getGold();
        showText("#msg", dialogue[9],0, 100)
    }
    else {
        showText("#msg", dialogue[10], 0, 100)
    }
    $("#next").show();
    $("#useWeapon").hide();
    $("#run").hide();
}


getGold = function () {
  var id = $('#characterName').data('name')
  gold = $("#gold").data("gold");
  gold1 = gold + 400;
  $("#gold").html("gold: "+ gold1)
  $.ajax("/character/gold/" + id, {
    type: 'PUT'
    }).then($('#textbox').html(dialogue[6]))

};
takeDamage = function() {
  var hp = $("#hp").data('data');
  hp1 = hp - 45;
  $("#hp").html("hp: " + hp1)
  var id = $("#characterName").data('name')
  $.ajax('/character/hp/' + id, {
    type: 'PUT',
    hp: 'no'

  }).then($("#textbox").html(dialogue[7]));

}