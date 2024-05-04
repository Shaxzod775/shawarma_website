from django.urls import path
from .views import CreateUserView, LoginUserView, UserAddressView, UserDeleteView, UserFullnameView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', CreateUserView.as_view()),
    path('login/', LoginUserView.as_view()),
    path('user/fullname/', UserFullnameView.as_view(), name='user-fullname'),
    path('user/address/', UserAddressView.as_view(), name='user-address-list'),
    path('user/address/<int:address_id>/', UserAddressView.as_view(), name='user-address-detail'),
    path('user/address/<int:address_id>/delete/', UserDeleteView.as_view(), name='user-address-delete'),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]