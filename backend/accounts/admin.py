from django.contrib import admin
from .models import Customer, CustomerAddress, CustomerFullname

class CustomerCredentials(admin.ModelAdmin):
    list_display = ("id", "phone")


class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ("id", "address", "apartment", "intercom", "entrance", "floor", "comments", "customer")
    list_display_links =("id", "address")



admin.site.register(Customer, CustomerCredentials)
admin.site.register(CustomerAddress, CustomerAddressAdmin)
admin.site.register(CustomerFullname)


