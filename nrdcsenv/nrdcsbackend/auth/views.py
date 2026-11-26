# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import parser_classes, api_view, authentication_classes
from users.models import Users
from users.serializers import UserSerializer
from rest_framework.permissions import AllowAny
from auth.NRDCSAuthentication import NRDCSAuthentication

# Create your views here.
class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print(request.data)
        if not 'email' in request.data:
            return JsonResponse(data={"success": False,"message": "login failed"})
        else:
            email = request.data['email']
            password = request.data['password']
            nrdcsauthentication = NRDCSAuthentication
            response = nrdcsauthentication.authenticate(request)
            """ queryset = Users.objects.filter(email_address=email, password = password)
            print("########") 
            print(queryset.query) 
            serializer = UserSerializer(queryset, many=True) 
            print(response) """
            print("response")
            print(response) 
            #return Response(serializer.data)
            api_response = {} 
            if(response['success']):
                api_response["success"] = True
                api_response["message"] = "Login Success"
                api_response["response"] = response
                return JsonResponse(data=api_response)
            else:
                api_response["success"] = False
                api_response["message"] = "The credentials you entered are incorrect. Please check your email/password and try again!"
                api_response["data"] = response
                return JsonResponse(data=api_response)

