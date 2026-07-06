let room = "";
let myName="";
let enemyName="Enemy";
let matchTime = 300;
let timerInterval;
let socket =
io();

let canvas;
let ctx;

function createRoom() {

  room = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  alert("Room Code : " + room);

  startGame();
}

function joinRoom() {

  const code =
    document.getElementById(
      "roomCode"
    ).value;

  if (code === "") {
    return;
  }

  room = code;

  startGame();
}

function startGame() {

  document.getElementById(
    "menu"
  ).style.display = "none";

  document.getElementById(
    "game"
  ).style.display = "block";
socket.emit(
  "join-room",
  {

    room: room,

    name: myName

  }
);

socket.on(
  "players",
  (players) => {

    if (
      players.length == 2
    ) {

      if (
        players[0].name ==
        myName
      ) {

        enemyName =
          players[1].name;

      } else {

        enemyName =
          players[0].name;

      }

      alert(
        "🎉 " +
        enemyName +
        " Joined!"
      );

    }

  }
);
    if (
      count === 2
    ) {

      alert(
        "🎉 Both Players Connected"
      );

    }

  }
);

  canvas =
    document.getElementById(
      "canvas"
    );

  ctx =
    canvas.getContext("2d");

  canvas.width = 1000;
  canvas.height = 500;

myName =
document.getElementById(
"playerName"
).value;

if(myName==""){

myName="Player";

}
  requestAnimationFrame(loop);
timerInterval =
setInterval(() => {

  matchTime--;

  document.getElementById(
    "timer"
  ).innerText =
    matchTime;

  if (
    matchTime <= 0
  ) {

    clearInterval(
      timerInterval
    );

    endMatch();
  }

}, 1000);
}

function loop() {

  update();

  draw();

  requestAnimationFrame(loop);
}

function update() {

  player.dx = 0;

  if (keys["a"]) {
    player.dx =
      -player.speed;
  }

  if (keys["d"]) {
    player.dx =
      player.speed;
  }

  if (
    keys["w"] &&
    player.onGround
  ) {
    player.dy =
      player.jumpPower;

    player.onGround =
      false;
  }

  player.dy +=
    player.gravity;

  player.x +=
    player.dx;

  player.y +=
    player.dy;

  if (
    player.y +
      player.height >=
    canvas.height
  ) {

    player.y =
      canvas.height -
      player.height;

    player.dy = 0;

    player.onGround =
      true;
  }
socket.emit(
  "player-move",
  {
    room: room,
    x: player.x,
    y: player.y
  }
);
for (
  let i = bullets.length - 1;
  i >= 0;
  i--
) {

  let b = bullets[i];

  b.x += b.speed;

  if (
    b.x >
    canvas.width
  ) {
    bullets.splice(i, 1);
    continue;
  }

  if (
    b.x <
      enemy.x +
        enemy.width &&
    b.x + b.width >
      enemy.x &&
    b.y <
      enemy.y +
        enemy.height &&
    b.y + b.height >
      enemy.y
  ) {

    enemy.hp -= 20;
document.getElementById(
  "hp"
).innerText =
enemy.hp;

    bullets.splice(i, 1);

  if (
  enemy.hp <= 0
) {

  player.kills++;

  document.getElementById(
    "kills"
  ).innerText =
    player.kills;

  socket.emit(
    "player-kill",
    {
      room: room,
      kills:
        player.kills
    }
  );

  enemy.hp = 100;

  document.getElementById(
    "hp"
  ).innerText = 100;

  enemy.x =
    Math.random() * 800;

  enemy.y = 300;

  if (
    player.kills >= 10
  ) {

    alert(
      "🏆 Winner : Ananda"
    );

  }

}

  }

}
}

function draw() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

ctx.fillStyle="white";

ctx.font="18px Arial";

ctx.fillText(

myName,

player.x,

player.y-10

);

  ctx.fillStyle =
    "deepskyblue";

  ctx.fillRect(
    player.x,
    player.y,
    player.width,
    player.height
  );

ctx.fillStyle="white";

ctx.font="18px Arial";

ctx.fillText(

enemyName,

enemy.x,

enemy.y-10

);
ctx.fillStyle = "crimson";

ctx.fillRect(
  enemy.x,
  enemy.y,
  enemy.width,
  enemy.height
);

ctx.fillStyle = "gold";

for (let b of bullets) {
  ctx.fillRect(
    b.x,
    b.y,
    b.width,
    b.height
  );
}
}
function shoot() {

  let bullet = {

    x:
      player.x +
      player.width,

    y:
      player.y +
      15,

    width: 15,
    height: 6,

    speed: 10

  };

  bullets.push(
    bullet
  );

  socket.emit(
    "shoot",
    {
      room: room,
      bullet: bullet
    }
  );

}

socket.on(
  "enemy-shoot",
  (data) => {

    bullets.push(
      data.bullet
    );

  }
);
socket.on(
  "enemy-kill",
  (data) => {

    enemy.kills =
      data.kills;

    if (
      enemy.kills >= 10
    ) {

      alert(
        "🏆 Winner : Jarin"
      );

    }

  }
);
socket.on(
  "enemy-kill",
  (data) => {

    enemy.kills =
      data.kills;

    if (
      enemy.kills >= 10
    ) {

      alert(
        "🏆 Winner : Jarin"
      );

    }

  }
);

function endMatch() {

  let winner =
    player.kills >
    enemy.kills
      ? "Ananda"
      : "Jarin";

  alert(
    "🏆 Match Over\nWinner : " +
      winner
  );

  document.getElementById(
    "restartBtn"
  ).style.display =
    "inline-block";

}

document
  .getElementById(
    "restartBtn"
  )
  .onclick =
  function () {

    location.reload();

  };