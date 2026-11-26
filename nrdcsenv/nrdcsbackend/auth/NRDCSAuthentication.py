
from rest_framework.authentication import BaseAuthentication,BasicAuthentication, TokenAuthentication
from users.serializers import UserSerializer
from rest_framework.response import Response
from django.http import JsonResponse
from users.models import Users
import hashlib, os
from auth.CacheManager import CacheManager

class NRDCSAuthentication(BaseAuthentication):
    def authenticate(request):
        email = request.data['email']
        password = request.data['password']
        queryset = Users.objects.filter(email_address=email, password = password)
        
        if(queryset.count() > 0):
            session_token = hashlib.sha1(os.urandom(128)).hexdigest()
            print("session_token")
            print(session_token)
            CacheManager.setcache('session_token', session_token)
            serializer = UserSerializer(queryset, many=True)
            CacheManager.setcache('loggedin_user', serializer.data[0])
            print("LOGGEDIN USER")
            print(serializer.data)
            return {"success": True, "data": serializer.data[0], "session_token": session_token}
        else: 
            return {"success": False}
        
    """ def authenticate_header(self, request):
        return BasicAuthentication.authenticate_header(self, request) """