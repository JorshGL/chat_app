import websockets as ws, asyncio, json


USERS = {
    # username : websocket
}


# async def register(username, websocket): 
#     USERS[websocket] = username
#     response = {
#         "type" : "response",
#         "code" : 1,
#         "message" : "connected",
#         "users_connected" : len(USERS)
#     }
#     return response


async def handle_connection(ws, username):
    if username not in USERS:
        USERS[username] = [ws]
    
    elif ws not in USERS[username]:
        USERS[username].append(ws)
    
    print(f'user {username} connected from {ws}, actual devices: {len(USERS[username])}')
    return {
        "type" : "response",
        "message" : "connected",
        "devices" : len(USERS[username])
    }


async def handle_disconnection(ws, username):
    USERS[username].remove(ws)
    
    print(f'device {ws} from user {username} has been disconnected, actual devices: {len(USERS[username])}')
    return


# async def send_messages(websocket, message):
#     for address in USERS.keys():
#         if address == websocket:
#             continue
#         event = {
#             "type": "message",
#             "message": message
#         }
#         await address.send(json.dumps(event))
        

async def handler(ws):
    async for event in ws:
        event = json.loads(event)
        
        if event.get('type') == "connection":
            username = event.get('username')       
            response = await handle_connection(ws, username)
            await ws.send(json.dumps(response))
            
        elif event.get('type') == "disconnection":
            username = event.get('username') 
            await handle_disconnection(ws, username)


async def main():
    async with ws.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())