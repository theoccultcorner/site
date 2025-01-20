const PORT = process.env.PORT || 3000;
const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

console.log(`Signaling server is running on port ${PORT}`);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle offer sent from a peer
  socket.on("offer", ({ sdp, target }) => {
    console.log(`Received offer from ${socket.id} to ${target}`);
    io.to(target).emit("offer", { sdp, sender: socket.id });
  });

  // Handle answer sent from a peer
  socket.on("answer", ({ sdp, target }) => {
    console.log(`Received answer from ${socket.id} to ${target}`);
    io.to(target).emit("answer", { sdp, sender: socket.id });
  });

  // Handle ICE candidate sent from a peer
  socket.on("ice-candidate", ({ candidate, target }) => {
    console.log(`Received ICE candidate from ${socket.id} to ${target}`);
    io.to(target).emit("ice-candidate", { candidate, sender: socket.id });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
