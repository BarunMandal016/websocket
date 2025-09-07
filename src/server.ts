// const { createServer } = require("http")

// const server= createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!',
//   }));
// })

// server.listen(8000,()=>{
//     console.log("server listening at 8000")
// })


import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,req) {
  ws.on('error message', console.error);
  wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({message:"New client is connected", IPAddress:req.socket.remoteAddress }))
    }
})
  ws.on('message', function message(data) {
    wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data)
        }
    })
    console.log('received: %s', data);
  });

  ws.on("close",()=>{
      wss.clients.forEach(client => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({message:"Client is disconnected", IPAddress:req.socket.remoteAddress }))
    }
})
  })
  // ws.on("")
//   ws.send('Server is reply your query');
});

