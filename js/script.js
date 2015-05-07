var input = document.getElementById('gameInput'),
    output = document.getElementById('gameOutput'),
    players = [],
    thisPlayer,
    otherPlayer,
    keys = [];

input.value = "";
output.innerHTML = "";

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    if (keys[13]) { // ENTER
        conn.send(input.value.toLowerCase());
        console.log("CHANGE!");
    } else if (keys[27]) { // ESCAPE
        // PAUSE GAME (NO MORE "game", show "pause")
    }
    keys[e.keyCode] = false;
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
            turn = "1";
            players[0].me = true;
            players[1].me = false;
            thisPlayer = players[0];
            otherPlayer = players[1];
            conn.send("$11")
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
}
