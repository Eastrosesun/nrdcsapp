from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Users
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'first_name', 'last_name', 'email_address', 'phone_number', 'user_type_id', 'last_login']