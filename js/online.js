var hoster;
var conn;
document.getElementById("game").style.display = "none";
document.getElementById("pause").style.display = "none";

function connect() {
    var key = document.getElementById("keyC").value;
    var peer = new Peer(key, {
        key: 'mnudj9c6vf426gvi'
    });
    hoster = false;

    peer.on('connection', function(iCon) {
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "initial";
        initiateGame();
        conn = peer.connect(iCon.peer);
        iCon.on('data', function(data) {
            onReceive(data);
        });
    });
}

function host() {
    var key = document.getElementById("keyH").value;
    if (key != "");
    var peer = new Peer({
        key: 'mnudj9c6vf426gvi'
    });
    hoster = true;
    conn = peer.connect(key);
    conn.on('open', function() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "initial";
        initiateGame();
    });
    peer.on('connection', function(iCon) {
        iCon.on('data', function(data) {
            onReceive(data);
        })
    })
}


function onReceive(data) {
    if (data == "0" || data == "1") {
        turn = data;
        changeLog();
    } else if (data == "11") {
        players[0].me = false;
        players[1].me = true;
        thisPlayer = players[1];
        otherPlayer = players[0];

    } else if (data == "10") {
        players[0].me = true;
        players[1].me = false;
        thisPlayer = players[0];
        otherPlayer = players[1];


    } else {
        var comma = data.indexOf(","),
            x = data.substring(0, comma),
            y = data.substring(comma + 1, data.length);
        playThereClick(x, y);
    }
}
