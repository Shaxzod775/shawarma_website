from django.contrib import admin
from .models import OrderItem, Order

class OrderItemInLine(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'delivery_cost', 'order_status', 'total_cost', 'ordered_at')
    inlines = [OrderItemInLine]


admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
