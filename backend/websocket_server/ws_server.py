import websockets as ws, asyncio, json, os
from ws_auth import handle_connection, handle_disconnection, get_users


async def handle_messages(ws, event):
    pass
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
            token = event.get('token')    
            response, status = await handle_connection(ws, token)
            print(get_users())
            await ws.send(json.dumps(response))
            if status == 400:
                await ws.close()
            
        elif event.get('type') == "disconnection":
            token = event.get('token') 
            await handle_disconnection(ws, token)
            
        elif event.get('type') == "message":
            await handle_messages(ws, event)


async def main():
    async with ws.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())