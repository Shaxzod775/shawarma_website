from rest_framework import generics, status
from .serializers import MealSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Meal




class MealAPIView(generics.GenericAPIView):
    serializer_class = MealSerializer
    queryset = Meal.objects.all()

    def get(self, meal_name):
        meal = get_object_or_404(Meal, name=meal_name)
        serializer = MealSerializer(meal)

        return Response(serializer.data, status=status.HTTP_200_OK)
            


