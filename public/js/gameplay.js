//all the dialogue in the game
var dialogue = [
    "You have lost your lover. However there is a way to bring them back. Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Go to the Dark Castle and bring back the magic sword. With it I can bring them back",
    "Welcome to my shop! What can I get you?",
    "Bandits attack!",
    "What do you want to do?",
    "You narrowly escaped the bandits!",
    "You escaped the bandits and grabbed 400 gold!",
    "The bandits beat you up you lost 45 HP",
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
///
///clears the board on the start of the game
var id = $("#characterName").data("name");
$(document).ready(function () {

  var turn = parseInt($("#turn").data("turn"));
  $("#adventure").hide();
  $("#over").hide();
  $("#overmg").hide()
  $("#shop").hide();
  $("#items").hide();
  $("#run").hide();
  $("#useWeapon").hide();
  $("#won").hide();
  $("#fight").hide();
  $("#sneak").hide();
  $("#playag").hide();
  $("#buy").on("click", function() {
    $("#items").show();
    $("#buy").hide()

  });
  //starts the logic for the game
  gameboi(turn);
   //the next button faciliates the progress of the game
   //it ups the turn which tells the gameboi function what to do
  $("#next").on("click", function() {
    turn++;
    $("#msg").empty();
    gameboi(turn, updateTurn());
    $("#monsters").hide()
    
  }); 
  //the logic for taking turn logics
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
                $("#monster").html("<img src='" +monsters[0]+ "'>")
                battleLoad(0)
                break;

            case 3:
                
                townLoad(1);
                
                break;
            case 4:
                $("#monster").show()
                $("#monster").html("<img src='" + monsters[1] + "'>")
                battleLoad(1)
                break;
            case 5:
                townLoad(2);
                break;
            case 6:
            $("#monster").show()
            $("#monster").html("<img src='" + monsters[2] + "'>")
                battleLoad(2)
                break;
            case 7:
                townLoad(3)
                break;
            case 8:
            $("#monster").show() 
            $("#monster").html("<img src='" + monsters[3] + "'>")
                battleLoad(3)
                break;
            case 9:
                townLoad(4)
                break;
            case 10:
                finalGame()
                break;
        }

       
      
    }
    //if the character chooses adventure it closes other buttons and loads the adventure screen
    $("#adventure").on("click", function () {
        console.log(turn)
        turn++
        $("#msg").empty()
        console.log(turn)
        //gameboi with callback ups the turn and lets the database know what the turn 
        //is so the player can revisit the game
        gameboi(turn, updateTurn())
    })
    //if in battle the character chooses not to fight 
    // it gives 3 possible outcomes
    $("#run").on("click", function () {
         encounter();
         $("#useWeapon").hide();
         $("#run").hide();
         $("#monster").hide();
    })
    $(".hi").on("click", function(){
        var eat = $(".hit").data("eat")
        eat -1;
        $(".hi").html("Eat: " + eat)
    
    })
    //if the character chooses to use weapons
    //it gives them a 60% percent chance of winning and getting some gold
    $("#useWeapon").on("click", function(){
        var weapon = $("#useWeapon").data("weapon")
        $("#monster").hide()
        if(weapon == 0|| weapon =='0'){
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

    //updates the database for the turn count
    updateTurn = function () {
        var id = $("#characterName").data('name')
        $.ajax('/turnUpdate/' + id + "/" + turn, {
            type: 'PUT',

        }).then()
    }
})
//this is the logic for changing screens when the screen changes
townLoad = function(num){
    $(function () {
        $("#adventure").show();
        $('#shop').show();
        $('#next').hide();
        $("useWeapon").hide();
        $("#run").hide();
        $("#sleep1").show();
        $("#potion1").show()
        showText("#msg", dialogue[4], 0, 100);
        $('.gameCont').css("background-image", "url("+ townPics[num] + ")")
    })
};
finalGame = function(){
    $('.gameCont').css("background-image", "url('/imgf/castle2.jpg')")
    $("#adventure").hide();
    $("#shop").hide();
    $("#potion1").hide();
    $("#sleep1").hide()
    $("#fight").show();
    $("#sneak").show();
    $("#next").hide();
    
    showText("#msg", "The final castle how will you get the sword?", 0, 100)
  
    $("#sneak").on("click", function(){
        var random1 = Math.random();
        if (random1 > 0.6){
            $(".gameCont").empty();
            $("#won").show();
            $("#playag").show()
            $('.gameCont').css("background-image", "url('/imgf/excal.jpg')")

        }
        else{
            $(".gameCont").empty()
            $("#over").show()
           $("#overmg").show()
           $('.gameCont').css("background-image", "url('/imgf/end.jpg')")

        }
    })
    $("#fight").on('click', function(){
        var random1 = Math.random();
        if (random1 > 0.6){
            $(".gameCont").empty();
            $("#won").show();
            $("#playag").show();
            $('.gameCont').css("background-image", "url('/imgf/excal.jpg')")
        }
        else{
            $(".gameCont").empty();
            $("#over").show();
           $("#overmg").show();
           $('.gameCont').css("background-image", "url('/imgf/end.jpg')");

        }
    })

}

//this is the logic function for the battle
battleLoad = function(num){
    showText("#msg", dialogue[3], 0, 100);
    $("#adventure").hide();
    $("#shop").hide();
    $("#potion1").hide();
    $("#sleep1").hide()
    $("#useWeapon").show()
    $("#run").show();
    $('.gameCont').css("background-image", "url("+ wildPics[num] + ")");
}
//same with the encounter
encounter = function() {
    //determines if they are or not
    

   
    //random number for the encounter
    var encounterChance = Math.random();
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
//updates the jqery as well as the database onweapon consumption
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
//updates the jqery and database on gainin gold
getGold = function () {
  var id = $('#characterName').data('name')
  gold = $("#gold").data("gold");
  gold1 = gold + 400;
  $("#gold").data("gold", gold1)
  $("#gold").html("gold: "+ gold1)
  $.ajax("/character/gold/" + id, {
    type: 'PUT'
    }).then($('#textbox').html(dialogue[6]))

};
//updates the jqery and database on receiving damage
takeDamage = function() {
  var hp = $("#hp1").data('hp');
  hp1 = hp - 45;
  $("#hp1").html("hp: " + hp1)
  if (hp1 <= 0){
     $(".gameCont").empty()
     $("#over").show()
     $("#overmg").show()
     $('.gameCont').css("background-image", "url('/imgf/end.jpg')")

  }
  else{
  var id = $("#characterName").data('name')
  $.ajax('/character/game/hp/' + id, {
    type: 'PUT',
    

  }).then( $("#textbox").html(dialogue[7]));
  }
}