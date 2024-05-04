from django.db import models


class Meal(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=150, blank=True)
    price = models.IntegerField()

    def __str__(self):
        return self.name
