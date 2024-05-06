from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.generics import  RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import UserSerializer, CustomerAddressSerializer, CustomerFullnameSerializer
from .models import CustomerAddress, CustomerFullname


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "phone": user.phone,
                "message": "User created successfully."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginUserView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        phone = request.data.get('phone')
        password = request.data.get('password')
        user = authenticate(phone=phone, password=password)
        if user: 
            return Response({
                "id": user.id,
                "phone": user.phone,
                "message": "User logged in successfully."
            })
        return Response({"message": "Неправильно введён номер телефона или пароль"}, status=status.HTTP_401_UNAUTHORIZED)


class UserAddressView(RetrieveUpdateDestroyAPIView):
    serializer_class = CustomerAddressSerializer
    permission_classes = [IsAuthenticated]
    queryset = CustomerAddress.objects.all()

    def get(self, request, address_id=None):
        user = request.user
        if address_id:
            address = get_object_or_404(CustomerAddress, pk=address_id, customer=user)
            serializer = CustomerAddressSerializer(address)
        else:
            addresses = CustomerAddress.objects.filter(customer=user)
            serializer = CustomerAddressSerializer(addresses, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=user)
            return Response({"message": "Адрес добавлен успешно!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, address_id=None):
        user = request.user
        if address_id:
            address = get_object_or_404(CustomerAddress, pk=address_id, customer=user)
            serializer = self.get_serializer(address, data=request.data, partial=True)
        else:
            return Response({'error': 'Address ID is required for update.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Адрес изменён успешно!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDeleteView(APIView):
    serializer_class = CustomerAddressSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, address_id):
        user = request.user
        try:
            user_address = CustomerAddress.objects.get(pk=address_id, customer=user)
            user_address.delete()
            return Response({'message': 'Address deleted.'}, status=status.HTTP_204_NO_CONTENT)
        except CustomerAddress.DoesNotExist:
            return Response({'error': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

class UserFullnameView(generics.GenericAPIView):
    serializer_class = CustomerFullnameSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user:
            fullname = get_object_or_404(CustomerFullname, customer=user)
            serializer = CustomerFullnameSerializer(fullname)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=user)
            return Response({"message": "ФИО добавлены успешно!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user = request.user
        if user:
            fullname = get_object_or_404(CustomerFullname, customer=user)
            serializer = self.get_serializer(fullname, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "ФИО изменены успешно!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    







