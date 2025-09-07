const ws = new WebSocket("ws://localhost:8080")
// ws.send("Here's some text that the server is urgently awaiting!")
// ws.addEventListener("open", (event) => {
//   ws.send("Hello Server!");
// });
ws.binaryType = "arraybuffer";
ws.onopen=()=>{
    ws.send("Here's some text that the server is urgently awaiting!")
}

// // Listen for messages
// ws.addEventListener("message", (event) => {
//     const decoder = new TextDecoder('utf-8')
//     const data = decoder.decode(event.data)
//     console.log("Message from server", data);
// });




ws.onmessage=(message) => {
    console.log(typeof message)
    // console.log(message.data)
    if (message.data instanceof ArrayBuffer) {
        const decoder = new TextDecoder('utf-8')
        const data = decoder.decode(message.data)
        console.log("Message from server", data)
    }
    else{
        console.log(message.data)
    }
}

