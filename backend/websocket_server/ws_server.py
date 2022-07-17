import websockets as ws, asyncio, json


USERS = {
    # socket : username
}


async def register(username, websocket): 
    USERS[websocket] = username
    response = {
        "type" : "response",
        "code" : 1,
        "message" : "connected",
        "users_connected" : len(USERS)
    }
    return response


async def send_messages(websocket, message):
    for address in USERS.keys():
        if address == websocket:
            continue
        event = {
            "type": "message",
            "message": message
        }
        await address.send(json.dumps(event))
        

async def handler(websocket):
    async for event in websocket:
        event = json.loads(event)
        
        if event.get('type') == "connection":
            username = event.get('username')       
            response = await register(websocket, username)
            await websocket.send(json.dumps(response))
            
        elif event.get('type') == "message":
            message = event.get('message')
            await send_messages(websocket, message)


async def main():
    async with ws.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())