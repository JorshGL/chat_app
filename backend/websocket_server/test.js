const websocket = new WebSocket("ws://localhost:8001")


const send_connection_event = () => {
    let evt = {
        "type" : "connection",
        "username" : "@test"
    }
    websocket.send(JSON.stringify(evt))
}

window.addEventListener('load', () => {
    send_connection_event()
})

const disconnection = () => {
    let evt = {
        "type" : "disconnection",
        "username" : "@test"
    }
    websocket.send(JSON.stringify(evt))
    return null;
}

window.onbeforeunload = disconnection;



websocket.addEventListener('message', ({data}) => {
    console.log(JSON.stringify(data))
})

