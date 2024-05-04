from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem



class OrderViewSet(generics.GenericAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

    def get(self, request):
        user = request.user
        if user:
            order = Order.objects.filter(customer=user)
            serializer = self.get_serializer(order, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    

    def post(self, request):
        user = request.user
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=user)
            return Response({'message' : 'Ваш заказ принят!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def put(self, request, id=None):
        user = request.user
        if id:
            order = get_object_or_404(Order, pk=id, customer=user)
            serializer = self.get_serializer(order, data=request.data, partial=True)
        else:
            return Response({'error': 'Order ID is required for update!'}, status=status.HTTP_400_BAD_REQUEST)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message" : "Статус заказа изменён успешно!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

           


