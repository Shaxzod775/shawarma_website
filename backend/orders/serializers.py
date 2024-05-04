from rest_framework import serializers
from .models import Order, OrderItem
from meals.serializers import MealSerializer
from meals.models import Meal



class OrderItemSerializer(serializers.ModelSerializer):
    meal = MealSerializer(read_only=True)
    meal_id = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all(), write_only=True, source='meal')

    class Meta:
        model = OrderItem
        fields = ['meal', 'meal_id', 'quantity', 'item_total_cost']
        read_only_fields = ['item_total_cost']


    def create(self, validated_data):
        return OrderItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.meal = validated_data.get('meal', instance.meal)
        instance.save()
        return instance
    
    

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'ordered_at', 'customer', 'delivery_cost', 'total_cost', 'order_items', 'order_status']
    
    def calculate_order_total_cost(self, obj):
        return obj.calculate_total_cost()

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items', [])
        order = Order.objects.create(**validated_data)
        for item_data in order_items_data:
            OrderItem.objects.create(order=order, **item_data)
        order.update_total_cost()
        return order
    
