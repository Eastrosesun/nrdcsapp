# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import parser_classes, api_view, authentication_classes
from .models import Orders, Customers
from .serializers import OrderSerializer, CustomerSerializer
from rest_framework.permissions import AllowAny
from auth.validateuser import validate_caller
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from datetime import datetime
from auth.CacheManager import CacheManager
from django.db import transaction

# Create your views here.

class OrdersAPIView(APIView):
    permission_classes = [AllowAny]
    #@method_decorator(validate_caller())
    def post(self, request):
        print("Request")
        print(request.data)
        payload = request.data
        print("CACHE LOGGED ")
        print(CacheManager.getcache('loggedin_user'))
        print(CacheManager.getcache('loggedin_user')["id"])
        customer_payload = {}
        customer_payload['customer'] = {}
        customer_payload['customer']["customer_id"] = payload["customer_id"] if payload["customer_id"]  else None
        customer_payload['customer']["first_name"] = payload["customer_first_name"]
        customer_payload['customer']["last_name"] = payload["customer_last_name"]
        customer_payload['customer']["phone_number"] = payload["customer_phone_number"]
        customer_payload['customer']["email_address"] = payload["customer_email_address"]
        customer_payload['customer']["address1"] = payload["customer_address1"]
        customer_payload['customer']["address2"] = payload["customer_address2"]
        customer_payload['customer']["city"] = payload["customer_city"]
        customer_payload['customer']["state"] = payload["customer_state"]
        customer_payload['customer']["zip"] = payload["customer_zip"]
        customer_payload['customer']["date_created"] = datetime.today()
        customer_payload['customer']["date_modified"] = datetime.today()
        customer_payload['customer']["modified_by"] = CacheManager.getcache('loggedin_user')["id"]  

        api_response = {} 
        # Check if the Customer exists in DB
        try:
            #existing customer
            customer = Customers.objects.get(id=customer_payload['customer']["customer_id"])
        except Customers.DoesNotExist:
            #new customer
            customer_serializer = CustomerSerializer(data=customer_payload['customer'])
            customer_serializer.is_valid(raise_exception=True)

        order_serializer = OrderSerializer(data=payload)
        #order_serializer.is_valid(raise_exception=True)
        

       
        #if order_serializer.is_valid():
        try:
            with transaction.atomic():
                if customer is None:
                    customer = customer_serializer.save()
                if not order_serializer.is_valid():
                    api_response["success"] = False
                    api_response["message"] = "There is a problem with your request"
                    api_response["data"] = order_serializer.errors
                    api_response["status"] = status.HTTP_400_BAD_REQUEST
                    #return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    return JsonResponse(data=api_response)
                order_serializer.save(customer=customer)
                
                print('order_serializer')
                print(order_serializer)
                api_response["success"] = True
                api_response["message"] = "Order created successfully!"
                api_response["data"] = order_serializer.data
                api_response["status"] = status.HTTP_201_CREATED
                return JsonResponse(data=api_response)
                
        except Exception as e: 
            #error = orders.is_valid(raise_exception=True)
            api_response["success"] = False
            api_response["message"] = "The credentials you entered are incorrect. Please check your email/password and try again!"
            api_response["status"] = status.HTTP_500_INTERNAL_SERVER_ERROR
            api_response["error"] = str(e)
            return JsonResponse(data=api_response)
    
    permission_classes = [AllowAny]
    #@method_decorator(validate_caller())
    def get(self, request):
       # orders = OrderSerializer(data=request.data)
        orders = Orders.objects.select_related('customer').order_by('-order_created_date').all()
        data = []
        for order in orders:
            obj = {}
            obj['id'] = order.id
            obj['order_number'] = order.order_number
            obj['order_created_date'] = order.order_created_date.strftime('%Y-%m-%d') if order.order_created_date else None
            obj['order_status'] = order.order_status
            obj['customer_id'] = order.customer_id
            obj['type_of_analysis'] = order.type_of_analysis
            obj['nature_of_sample'] = order.nature_of_sample
            obj['type_of_analysis'] = order.type_of_analysis
            obj['order_completion_date'] = order.order_completion_date.strftime('%Y-%m-%d') if order.order_completion_date  else None
            obj['chargeable_value'] = order.chargeable_value
            obj['gst'] = order.gst
            obj['total_amount'] = order.total_amount
            obj['payment_mode'] = order.payment_mode
            obj['payment_status'] = order.payment_status
            obj['payment_status_display'] = order.get_payment_status_display()
            obj['order_status_display'] = order.get_order_status_display()
            obj['date_created'] = order.date_created.strftime('%Y-%m-%d') if order.date_created else None
            obj['date_modified'] = order.date_modified.strftime('%Y-%m-%d') if order.date_modified else None
            obj['created_by'] = order.created_by.id
            obj['modified_by'] = order.modified_by.id
            obj['customer_id'] = order.customer.id
            obj['customer_first_name'] = order.customer.first_name
            obj['customer_last_name'] = order.customer.last_name
            obj['customer_phone_number'] = order.customer.phone_number
            obj['customer_email_address'] = order.customer.email_address
            obj['customer_address1'] = order.customer.address1
            obj['customer_address2'] = order.customer.address2
            obj['customer_city'] = order.customer.city
            obj['customer_state'] = order.customer.state
            obj['customer_zip'] = order.customer.zip
            obj['customer_date_created'] = order.customer.date_created.strftime('%Y-%m-%d') if order.customer.date_created else None
            obj['customer_date_modified'] = order.customer.date_modified.strftime('%Y-%m-%d') if order.customer.date_modified else None
            data.append(obj)
            print(data)
        #serializer = OrderSerializer(orders, many=True)
        #return Response(serializer.data)
        # Return the clean dictionary list as JSON
        # Set safe=False because data is a list, not a dict
        return JsonResponse(data, safe=False)
        #return Response(data)