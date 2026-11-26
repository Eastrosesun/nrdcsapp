from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Orders, Customers

class CustomerSerializer(serializers.ModelSerializer): 

    class Meta:
        model = Customers
        fields = ['id','first_name', 'last_name', 'phone_number', 'email_address', 'address1', 'address2', 'city', 'state', 'zip', 'date_created', 'date_modified', 'modified_by']


class OrderSerializer(serializers.ModelSerializer):

    """ order_status_display = serializers.CharField(
        source='get_order_status_display',
        read_only=True
    ) """
    payment_status_display = serializers.CharField(
        source='get_payment_status_display',
        read_only=True
    )
    order_status_display = serializers.CharField(
        source='get_order_status_display',
        read_only=True
    )
    #customer = CustomerSerializer(required=False, read_only=True)
    customer = CustomerSerializer(read_only=True)
    class Meta:
        model = Orders
        fields = ['id', 'order_number', 'order_created_date', 'order_status', 'nature_of_sample', 'type_of_analysis', 'order_completion_date', 'chargeable_value', 'gst', 'total_amount', 'payment_mode', 'payment_status', 'payment_status_display','order_status_display', 'date_created', 'date_modified', 'created_by', 'modified_by', 'customer']

