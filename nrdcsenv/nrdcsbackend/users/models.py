from django.db import models

# Create your models here.

# USER MODEL
class UserType(models.Model):
    name = models.CharField(max_length=20, null=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

# USER MODEL
class Users(models.Model):
    first_name = models.CharField(max_length=50, null=False)
    last_name = models.CharField(max_length=50, null=False)
    email_address = models.CharField(max_length=80, null=False)
    phone_number = models.CharField(max_length=15, null=True)
    profile_picture = models.ImageField(upload_to='profile', null=True) 
    password = models.CharField(max_length=15, null=False)
    last_login = models.DateTimeField(null=True)
    user_type = models.ForeignKey(UserType, on_delete=models.PROTECT)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)


