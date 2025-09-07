import { error } from "console"
import Reconnect from "./reconnect"
import WebSocket from "ws"
let ws: WebSocket
ws = new WebSocket("ws://localhost:8080")
ws.binaryType = "arraybuffer"

// Before sending data, connection is supposed to be opened
// ws.addEventListener("open", (event) => {
// ws.send("Here's some text that the server is urgently awaiting!")
// });

// The above samething can be done by setting the event handler property
ws.onopen = () => {
  ws.ping("Hello server, are you alive?")
  //   ws.send("Here's some text that the server is urgently awaiting!")
}

ws.onmessage = (message) => {
  if (message.data instanceof ArrayBuffer) {
    const decoder = new TextDecoder("utf-8")
    const data = decoder.decode(message.data)
    console.log("Message from server", data)
  } else {
    console.log(message.data)
  }
}

// ws.onclose = () => {
//   console.log("User is getting disconnected")
//   // Trying to reconnect to server
//   // ws= await Reconnect()
//   setTimeout(() => {
//     ws = new WebSocket("ws://localhost:8080")
//   }, 3000)

//   //   ws.readyState===0?
// }

// ws.on("error", () => {
//   const clearTimeout = setInterval(() => {
//     ws = new WebSocket("ws://localhost:8080")
//   }, 2000)
// })
ws.on("ping", () => {
  ws.pong("Client is responding to the server ping")
  ws.send("Handshake is completed!!!")
})

ws.on("pong", (message) => {
  console.log("data is %s", message)
})

ws.onerror = (error) => {
  console.log(error.message)
}
