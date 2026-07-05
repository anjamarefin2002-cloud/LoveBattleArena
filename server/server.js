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