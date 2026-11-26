# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from users.models import Users

# Create your models here.
""" class Orders(models.Model):    
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    phone_number =  models.CharField(max_length=15, null=True)
    email_address = models.CharField(max_length=80, null=True)
    address1 =  models.CharField(max_length=80, null=False)
    address2  = models.CharField(max_length=80, null=True)
    city  = models.CharField(max_length=80, null=True)
    state  = models.CharField(max_length=15, null=True)
    zip  = models.CharField(max_length=10, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(Users, on_delete=models.CASCADE) """

class Customers(models.Model):    
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    phone_number =  models.CharField(max_length=15, null=True)
    email_address = models.CharField(max_length=80, null=True)
    address1 =  models.CharField(max_length=80, null=False)
    address2  = models.CharField(max_length=80, null=True, blank=True)
    city  = models.CharField(max_length=80, null=True)
    state  = models.CharField(max_length=15, null=True)
    zip  = models.CharField(max_length=10, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    #customer_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    modified_by = models.ForeignKey(Users, on_delete=models.CASCADE)



class Orders(models.Model):

    # ORDER_STATUS
    CREATED = 1
    IN_PROGRESS = 2
    REPORTS_READY = 3
    DELIVERED = 4
    ORDER_STATUS = (
            (CREATED, "CREATED"),
            (IN_PROGRESS, "IN PROGRESS"),
            (REPORTS_READY, "REPORTS READY"),
            (DELIVERED, "DELIVERED"),
    )
    # TYPE OF ANALYSIS
    """ TYPE_OF_ANALYSIS = (
            (1, "LIO"),
            (2, "SIO"),
            (3, "CAO"),
            (4, "MGO"),
            (5, "FE20"),
            (6, "POTABILITY/CONSTRUCTION"),
    ) """

    # PAYMENT MODE
    UPI = 1
    CHEQUE = 2
    CASH = 3
    PAYMENT_MODE = (
            (UPI, "UPI"),
            (CHEQUE, "CHEQUE"),
            (CASH, "CASH"),
    )

    # PAYMENT STATUS
    NO_PAYMENT = 1
    PARTIAL_PAYMENT = 2
    FULL_PAYMENT = 3
    PAYMENT_STATUS_CHOICES = (
            (NO_PAYMENT, "NO PAYMENT"),
            (PARTIAL_PAYMENT, "PARTIAL PAYMENT"),
            (FULL_PAYMENT, "FULL PAYMENT"),
    )


    order_number = models.CharField(max_length=50, null=False)
    order_created_date = models.DateTimeField(auto_now_add=True)
    order_status = models.IntegerField(choices=ORDER_STATUS, default=1)
    customer = models.ForeignKey(Customers, related_name='customer', on_delete=models.CASCADE)
    nature_of_sample = models.JSONField(default=list, blank=False)
    type_of_analysis = models.JSONField(default=list, blank=False)
    order_completion_date = models.DateTimeField(null=True, blank=True)
    chargeable_value = models.IntegerField(null=True)
    gst = models.IntegerField(null=True)
    total_amount = models.IntegerField(null=True) 
    payment_mode = models.JSONField(default=list, blank=False)
    payment_status = models.IntegerField(choices=PAYMENT_STATUS_CHOICES, default=NO_PAYMENT)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Users, related_name='created_user', on_delete=models.PROTECT)
    modified_by = models.ForeignKey(Users, related_name='modified_user', on_delete=models.PROTECT)




