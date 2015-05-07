var input = document.getElementById('gameInput'),
    inputString = "",
    output = document.getElementById('gameOutput'),
    turn,
    players = [],
    thisPlayer,
    befW = "",
    aftW = "",
    otherPlayer,
    keyCodes = [],
    alphabet = ['a','b','c','d','e','f','h','i','j','k','l','m','n','o','p','q',
    'r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '],
    keys = [];

input.value = "";
output.innerHTML = "";

document.body.addEventListener("keydown", function(e) {
    keyCodes[e.keyCode] = true;
    key = e.key;
    if (keyCodes[13]) { // ENTER
      if(turn == 3){
        conn.send(input.value);
        input.style.display = "none";
        input.value = "";
        inputString = "";
      } else if (turn == 1) {
        endTurn();
      }
    } else if (keyCodes[27]) { // ESCAPE
        // PAUSE GAME (NO MORE "game", show "pause")
    } else if (alphabet.indexOf(key)!=-1 && turn != 3 && inputString.length<21){
      inputString+=key;
      i = "l" + (inputString.length-1);
      document.getElementById(i).style.color = "green";
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
            input.style.backgroundColor = "grey";
            players[0].me = true;
            players[1].me = false;
            thisPlayer = players[0];
            otherPlayer = players[1];
            conn.send("$11");
        } else {
            conn.send("$1");
            turn = "0";
            input.style.display = "none";
            players[0].me = false;
            players[1].me = true;
            thisPlayer = players[1];
            otherPlayer = players[0];
            conn.send("$10");
        }
    }
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
