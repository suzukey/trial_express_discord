const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 5000, host: "127.0.0.1" }, () => {
  console.log(`WebSocket server is listening to port ${wss.address().port}`)
})

wss.on("connection", function connection(ws, req) {
  console.log("client connected.")
  ws.on("close", () => {
    console.log("client disconnected.")
  })
})
