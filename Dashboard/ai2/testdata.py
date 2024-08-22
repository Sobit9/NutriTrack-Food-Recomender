import random
random_numbers = [random.randint(0, 100) for _ in range(10)]
print(random_numbers)
# Generate numbers from 0 to 1500 with a gap of 50
x1 = list(range(200, 1500, 50))
x2 = list(range(10, 188, 7))
x3 = list(range(2,104,4))
print(len(x1),len(x2),len(x3))
y1 = [[1] for _ in range(78)]
print(y1)

# server.py
import asyncio
import websockets
import json

async def handler(websocket, path):
    data = await websocket.recv()
    print("Received data:", data)
    await websocket.send("Data received")

start_server = websockets.serve(handler, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
