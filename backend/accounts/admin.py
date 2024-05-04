from django.contrib import admin
from .models import Customer, CustomerAddress, CustomerFullname


class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ("id", "address", "apartment", "intercom", "entrance", "floor", "comments", "customer")
    list_display_links =("id", "address")





admin.site.register(Customer)
admin.site.register(CustomerAddress)
admin.site.register(CustomerFullname)


