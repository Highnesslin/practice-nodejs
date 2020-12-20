const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    console.log("msg", msg);

    // 广播给所有人
    io.emit("chat message", msg);
  });
  socket.on("disconnect", function () {
    console.log("a user disconnected");
  });
});

http.listen(3000, () => console.log(`Example app listening on port port!`));
