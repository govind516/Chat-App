from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()   
    recipient = UserSerializer()

    class Meta:
        model = Message
        fields = ["id", "sender", "recipient", "content", "timestamp"]
