var elem = document.getElementById('game'),
    players = [],
    thisPlayer,
    otherPlayer,
    keys = [];

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    if (keys[13]) { // ENTER
        // SEND DATA
    } else if (keys[27]) { // ESCAPE
        // PAUSE GAME (NO MORE "game", show "pause")
    } else {

    }
});

// Add element.

for (i = 0; i < 10; i++) {
    for (j = 0; j < 20; j++) {
        elements.push({
            colorOut: "#A0B2A6",
            colorIn: "#61988E",
            colorInTouch: "#BCC4DB",
            width: 20,
            height: 20,
            top: 20 * i,
            left: 20 * j
        });

    }
}

// Add players

players.push({
    me: false,
});

players.push({
    me: false,
});

function renderGame() {
    elements.forEach(function(element) {
        context.fillStyle = element.colorOut;
        context.fillRect(element.left, element.top, element.width, element.height);
        context.fillStyle = element.colorIn;
        context.fillRect(element.left + 1, element.top + 1, element.width - 2, element.height - 2);
        if (isInSight(element.left, element.top)) {
            context.fillStyle = thisPlayer.colorView;
            context.fillRect(element.left + 1, element.top + 1, element.width - 2, element.height - 2);
        }
    });

    players.forEach(function(player) {
        if (!(player.me == otherPlayer.me && !isInSight(otherPlayer.left, otherPlayer.top))) {
            context.fillStyle = player.colorOut;
            context.fillRect(player.left, player.top, player.width, player.height);
            context.fillStyle = player.color;
            context.fillRect(player.left + 1, player.top + 1, player.width - 2, player.height - 2);
        }
    });
    if(thisPlayer.left==otherPlayer.left && thisPlayer.top==otherPlayer.top){
        document.getElementById("explosion").style.display = "initial";
    }
}

// Initial render

elements.forEach(function(element) {
    context.fillStyle = element.colorOut;
    context.fillRect(element.left, element.top, element.width, element.height);
    context.fillStyle = element.colorIn;
    context.fillRect(element.left + 1, element.top + 1, element.width - 2, element.height - 2);
});

players.forEach(function(player) {
    context.fillStyle = player.colorOut;
    context.fillRect(player.left, player.top, player.width, player.height);
    context.fillStyle = player.color;
    context.fillRect(player.left + 1, player.top + 1, player.width - 2, player.height - 2);
});

//Initiate the game
function initiateGame() {
    document.getElementById("lo").style.display = "none";
    if (hoster) {
        if (Math.floor(Math.random() * 2) == 1) { // 1/2
            conn.send("0");
            turn = "1";
            players[0].me = true;
            players[1].me = false;
            thisPlayer = players[0];
            otherPlayer = players[1];
            conn.send("11")
            changeLog();
        } else {
            conn.send("1");
            turn = "0";
            players[0].me = false;
            players[1].me = true;
            thisPlayer = players[1];
            otherPlayer = players[0];
            conn.send("10");
            changeLog();
        }
    }
}

var playCount = 0;
