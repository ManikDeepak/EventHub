from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import status
from django.core import serializers
import json
from rest_framework.views import APIView
from rest_framework.response import Response



from my_api.models import User,Event,Likes
from my_api.serializers import userSerializer,eventSerializer,likeSerializer, customLikeSerializer

# Create your views here.

class userViewSet (viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = userSerializer
    
    
class eventViewSet (viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = eventSerializer
    
    
class likeViewSet (viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = likeSerializer

class login(APIView):
    def post(self, request):
        uname = request.data.get('username')
        pwrd = request.data.get('password')
        user = User.objects.filter(username=uname, password=pwrd)
        if(user):
            response = serializers.serialize('json', user)
            return JsonResponse({"status":True,"result":response},safe=False)
        else:
            data = {"status":False,"msg":"User Not Found"}
            response = json.dumps(data)
            return JsonResponse(response, safe=False)
    


    
class register(APIView):
    def post(self, request):
        user = User.objects.filter(username=request.data.get("username"))
        if(user):
            data = {"status":False,"msg":"User Already Exist "}
            response = json.dumps(data)
            return JsonResponse(response, safe=False)
        
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class createEvent(APIView):
    def post(self, request):
        serializer = eventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(eventSerializer(event).data)
        else:
            return Response(serializer.errors, status=400)


class getMyEvent(APIView):
    def get(self,request):
        username = request.GET.get('username','')
        myEvents = Event.objects.filter(username=username)
        serialize_data = eventSerializer(myEvents, many=True)
        return Response(serialize_data.data)
    

class getAllEvent(APIView):
    def get(self,request):
        events = Event.objects.all()
        serialize_data = eventSerializer(events, many=True)
        return Response(serialize_data.data)


class getMyLikes(APIView):
    def get(self,request):
        username = request.GET.get('username','')
        user_id = self.getUserId(username)

        
        likes = Likes.objects.filter(user_id = user_id)
        serialize_data = customLikeSerializer(likes, many=True)
        return Response(serialize_data.data)
    
    def getUserId(self,username):
        user= User.objects.get(username = username)
        return user.pk

class addLike(APIView):
    def post(self, request):
        print(request.data)               
        serializer = likeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class getMyId(APIView):
    def get(self,request):
        username = request.GET.get("username",'')
        user= User.objects.get(username = username)
        return Response({"num":user.pk})
    
class deleteLike(APIView):
    def delete(self, request):
        print("kuch toh hua")
        user_id = request.query_params.get('user_id')
        event_id = request.query_params.get('event_id')
        like = Likes.objects.filter(user_id=user_id, event_id=event_id).first()
        if like:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)