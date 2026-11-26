from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import parser_classes, api_view, authentication_classes
from .models import Users
from.serializers import UserSerializer
from rest_framework.permissions import AllowAny
from functools import wraps
from auth.CacheManager import CacheManager
from django.utils.decorators import method_decorator
from django.http import HttpResponseForbidden
from auth.validateuser import validate_caller


""" def validate_caller(): 
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            cache_session_token = CacheManager.getcache('session_token')
            print("cache_session_token")
            print(cache_session_token)
            if cache_session_token is not None:
                bearer_token = request.headers['Authorization'].split(' ')[1]
                if cache_session_token == bearer_token:
                    print("bearer_token")
                    print(bearer_token)
                    return view_func(request, *args, **kwargs)
                else:
                    return HttpResponseForbidden("Forbidden")
            else:
                return HttpResponseForbidden("Forbidden")
        return wrapper
    return decorator """


class UserListAPI(APIView):
    permission_classes = []  # Allow all users so the decorator can handle it
    authentication_classes = [] 
    @method_decorator(validate_caller())
    def get(self, request):
        users = Users.objects.all() 
        print(f"Queryset count: {users.count()}")
        serializer = UserSerializer(users, many=True)
        print(serializer.data)
        return Response(serializer.data) 

""" def get(self, request):
    users = Users.objects.all()
    
    print(f"Queryset count: {users.count()}")
    serializer = UserSerializer(users, many=True)
    print(serializer.data)
    return Response(serializer.data) """
    
