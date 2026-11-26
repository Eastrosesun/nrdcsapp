from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import UserListAPI

urlpatterns = [
    path('getusers/', UserListAPI.as_view(), name='user-list')
]