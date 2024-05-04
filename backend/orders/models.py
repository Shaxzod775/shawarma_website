from django.db import models
from accounts.models import Customer
from meals.models import Meal


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    ordered_at = models.DateTimeField(auto_now_add=True)
    delivery_cost = models.IntegerField()
    order_status = models.CharField(max_length=20, choices=[
        ('delivered', 'Заказ Доставлен'),
        ('cancelled', 'Заказ Отменён'),
        ('on_the_way', 'Заказ в Пути')
    ], default='on_the_way')
    total_cost = models.PositiveBigIntegerField(default=0, editable=False)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    def calculate_total_cost(self):
        item_costs = sum([item.item_total_cost() for item in self.order_items.all()])
        return item_costs + self.delivery_cost
    
    def update_total_cost(self):
        self.total_cost = self.calculate_total_cost()
        self.save(update_fields=['total_cost'])
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, related_name='order_items', on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def item_total_cost(self):
        return self.meal.price * self.quantity
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.order.update_total_cost()
    
