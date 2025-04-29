from rest_framework import serializers
from .models import Listing, SavedListings
from authentication.models import User

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'id']  

class AddListingSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) 

    class Meta:
        model = Listing
        exclude = ['saved']

    def create(self, validated_data):
        return Listing.objects.create(**validated_data)

class EditListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['title', 'location', 'phone', 'price', 'description', 'image_1', 'image_2', 'image_3', 'status']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.location = validated_data.get('location', instance.location)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.price = validated_data.get('price', instance.price)
        instance.description = validated_data.get('description', instance.description)
        instance.image_1 = validated_data.get('image_1', instance.image_1)
        instance.image_2 = validated_data.get('image_2', instance.image_2)
        instance.image_3 = validated_data.get('image_3', instance.image_3)
        instance.status = validated_data.get('status', instance.status)

        instance.save()
        return instance

class ListingSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    class Meta:
        model = Listing
        fields = "__all__"
        extra_kwargs = {
            "author": {"read_only": True}
        }

class SavedListingsSerializer(serializers.ModelSerializer):
    listing = ListingSerializer(read_only=True)
    class Meta:
        model = SavedListings
        fields = "__all__"
    
    def create(self, validated_data):
        return SavedListings.objects.create(**validated_data)