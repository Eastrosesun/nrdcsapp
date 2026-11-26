from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import OrdersAPIView

urlpatterns = [
    path('orders/', OrdersAPIView.as_view(), name='orders-list-create')
]