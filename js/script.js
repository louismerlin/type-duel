var inputString = "",
    output = document.getElementById('gameOutput'),
    firstPush = true,
    turn,
    players = [],
    thisPlayer,
    befW = "",
    aftW = "",
    otherPlayer,
    keyCodes = [],
    alphabet = [],
    keys = [];

output.innerHTML = "";
for(i=65;i<91;i++){
  alphabet.push(i);
}
alphabet.push(32);

document.body.addEventListener("keydown", function(e) {
    keyCodes[e.keyCode] = true;
    if (keyCodes[13]) { // ENTER
      if(turn == 3 || turn == 1){
        endTurn();
      }
    } else if (keyCodes[27]) { // ESCAPE
        // PAUSE GAME (NO MORE "game", show "pause")
    } else if (alphabet.indexOf(e.keyCode)!=-1 && turn != 3 && inputString.length<21){
      inputString+=String.fromCharCode(e.keyCode).toLowerCase();
      i = "l" + (inputString.length-1);
      document.getElementById(i).style.color = "green";
    } else if (alphabet.indexOf(e.keyCode)!=-1 && turn == 3 && inputString.length<21){
      if(firstPush){
        output.innerHTML = "";
        firstPush = false;
      }
      inputString+=String.fromCharCode(e.keyCode).toLowerCase();
      output.innerHTML+=String.fromCharCode(e.keyCode).toLowerCase();
    }
    keyCodes[e.keyCode] = false;
});

// Add players
players.push({
    me: false,
});
players.push({
    me: false,
});

//Initiate the game
function initiateGame() {
    if (hoster) {
        if (Math.floor(Math.random() * 2) == 1) { // 1/2
            conn.send("$0");
            turn = "3";
            output.innerHTML = "You go first";
            players[0].me = true;
            players[1].me = false;
            thisPlayer = players[0];
            otherPlayer = players[1];
            conn.send("$11");
        } else {
            conn.send("$1");
            turn = "0";
            players[0].me = false;
            players[1].me = true;
            thisPlayer = players[1];
            otherPlayer = players[0];
            conn.send("$10");
        }
    }
    inputString = "";
}

function endTurn(){
  conn.send(inputString);
  inputString = "";
  turn = 0;
  clearLTags();
}

function fillOutput(s){
  out = "";
  for(i=0;i<21;i++){
    out+='<l id="l'+i+'">'+(s.length>i ? s.charAt(i) : "")+'</l>';
  }
  return out;
}

function clearLTags(){

}
