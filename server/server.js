const express =
require("express");

const http =
require("http");

const { Server } =
require("socket.io");

const app =
express();

const server =
http.createServer(app);

const io =
new Server(server);

app.use(
  express.static(
    "../client"
  )
);

let rooms = {};

io.on(
  "connection",
  (socket) => {

    socket.on(
      "join-room",
      (room) => {

        socket.join(room);

        if (
          !rooms[room]
        ) {
          rooms[room] =
            [];
        }

        rooms[room]
          .push(
            socket.id
          );

        io.to(room)
          .emit(
            "players",
            rooms[room]
              .length
          );

      }
    );
socket.on(
  "player-move",
  (data) => {

    socket
      .to(data.room)
      .emit(
        "enemy-move",
        {
          x: data.x,
          y: data.y
        }
      );

  }
);
socket.on(
  "shoot",
  (data) => {

    socket
      .to(data.room)
      .emit(
        "enemy-shoot",
        data
      );

  }
);
socket.on(
  "player-kill",
  (data) => {

    socket
      .to(data.room)
      .emit(
        "enemy-kill",
        data
      );

  }
);

  }
);

server.listen(
  3000,
  () => {
    console.log(
      "Server Running..."
    );
  }
);