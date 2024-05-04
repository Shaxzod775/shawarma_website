from django.urls import path
from .views import MealAPIView

urlpatterns = [
    path('meal/', MealAPIView.as_view(), name='meal'),
]


