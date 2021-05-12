const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

// run when a clioent connects
io.on("connection", (socket) => {
  // welcome , to the current client
  socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

  // to all the clients, exept the client that connecting !Broadcast when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  // To All clients
  //io.emit()

  // runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  // Listen for chatMassage
  socket.on("chatMassage", (msg) => {
    io.emit("message", formatMessage("User", msg));
  });
});

const PORT = 3037 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
