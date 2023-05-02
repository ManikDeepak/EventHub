from rest_framework import serializers
from my_api.models import User,Event,Likes

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'username', 'phone','password', 'email')
    
class eventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('event_id','event_name', 'date', 'time','location','image','event_desc','username')

class likeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'

class customLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ["event_id"]
        