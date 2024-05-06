from rest_framework import serializers
from .models import Customer, CustomerAddress, CustomerFullname


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Customer.objects.create_user(**validated_data)
        return user
    
class CustomerFullnameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFullname
        fields = ['fullname']

        extra_kwargs = {'fullname': {'required': False}}

class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['address', 'apartment', 'intercom', 'entrance', 'floor', 'comments']

        extra_kwargs = {
            'apartment': {'required': False}, 
            'intercom': {'required': False}, 
            'entrance': {'required': False}, 
            'floor': {'required': False}, 
            'comments': {'required': False}, 
        }

    def create(self, validated_data):
        return CustomerAddress.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.address = validated_data.get('address', instance.address)
        instance.apartment = validated_data.get('apartment', instance.apartment)
        instance.intercom = validated_data.get('intercom', instance.intercom)
        instance.entrance = validated_data.get('entrance', instance.entrance)
        instance.comments = validated_data.get('comments', instance.comments)
        instance.save()
        return instance
    
    def delete(self, instance):
        instance.delete()




