import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message
from django.contrib.auth.models import User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Debug log
        print(f"Attempting connection for room: {self.room_name}")

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        recipient_id = data["recipient"]

        await self.save_message(message, recipient_id)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": self.scope["user"].username,
            },
        )

    async def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]

        await self.send(text_data=json.dumps({"message": message, "sender": sender}))

    @database_sync_to_async
    def save_message(self, message, recipient_id):
        recipient = User.objects.get(id=recipient_id)
        Message.objects.create(
            sender=self.scope["user"], recipient=recipient, content=message
        )
