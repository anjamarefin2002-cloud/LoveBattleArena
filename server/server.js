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
  (data) => {

    socket.join(data.room);

    socket.playerName =
      data.name;

    if (!rooms[data.room]) {

      rooms[data.room] = [];

    }

    rooms[data.room].push({

      id: socket.id,

      name: data.name

    });

    io.to(data.room).emit(

      "players",

      rooms[data.room]

    );

  }
);

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
socket.on(
  "disconnect",
  () => {

    for(let room in rooms){

      rooms[room]=
      rooms[room].filter(

        p=>p.id!=socket.id

      );

      io.to(room).emit(

        "players",

        rooms[room]

      );

      if(

        rooms[room].length==0

      ){

        delete rooms[room];

      }

    }

  }
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