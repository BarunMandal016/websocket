export default async function Reconnect() {
  const nws= await setTimeout(() => {
    return new WebSocket("ws://localhost:8080")
  }, 3000)

  return nws
}
