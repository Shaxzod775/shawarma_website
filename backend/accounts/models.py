from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomerManager(BaseUserManager):
    def create_user(self, phone, password=None, **extra_fields):
        if not phone:
            raise ValueError('The phone must be set')
        customer = self.model(phone=phone, **extra_fields)
        customer.set_password(password)
        customer.save(using=self._db)
        return customer
    
    def create_superuser(self, phone, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(phone, password, **extra_fields)



class Customer(AbstractBaseUser, PermissionsMixin):
    phone = models.IntegerField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomerManager()

    USERNAME_FIELD = 'phone'

    def __str__(self):
        return str(self.phone)

class CustomerFullname(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='fullname')
    fullname = models.CharField(max_length=70, unique=True)

    def __str__(self):
        return self.fullname

class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='addresses')
    address = models.TextField(max_length=250)
    apartment = models.CharField(max_length=15, blank=True, default="")
    intercom = models.CharField(max_length=15, blank=True, default="")
    entrance = models.IntegerField(null=True, blank=True)
    floor = models.IntegerField(null=True, blank=True)
    comments = models.TextField(max_length=250, blank=True, default="")

    def __str__(self):
         return f"{self.address}, Apt {self.apartment}, Intercom {self.intercom}, Entrance {self.entrance}, Floor {self.floor}, Comments: {self.comments}"



