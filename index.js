const http = require("http")
const { WebSocketServer, WebSocket } = require("ws")
const port = 3000

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hello! This is an HTTP endpoint.")
    const ws = new WebSocket("ws://127.0.0.1:3000")
    ws.on("open", () => {
      ws.on("message", (message) => {
        console.log(`Received: ${message}`)
      })

      ws.on("close", () => {
        console.log("WebSocket connection closed.")
      })
    })
  } else {
    res.statusCode = 404
    res.end("404 Not Found")
  }
})

const wss = new WebSocketServer({ server })

wss.on("connection", (ws,req) => {
  console.log("WebSocket connection established!")
     const urlParams = new URL(req.url, `http://${req.headers.host}`);
     const name = urlParams.searchParams.get("name")
     console.log(name,"connected")
  ws.send("Welcome to the WebSocket server!")

  ws.on("message", (message) => {
    console.log(`${name} said: ${message}`)
        wss.clients.forEach((client)=> {
          if (client !== ws) {
            client.send(`${name} said: ${message}`)
          }
        })
  })

  ws.on("close", () => {
    console.log("WebSocket connection closed.")
  })
})

server.listen(port, () => {
  console.log(`Server running at localhost: ${port}/`)
})
