from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise DRFValidationError(e.messages)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        user.is_active = False 
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class UpdateTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField()

    def validate_password(self, validated_data):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            return DRFValidationError(e.messages)
        return value

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['first_name', 'last_name', 'email', 'phone']
    
    def validate_phone(self, value):
        value = value.strip().replace(" ", "")
        
        if value.startswith("0"):
            value = value[1:] 
        if not (value.startswith('9') or value.startswith('7')) or len(value) != 9 or not value.isnumeric():
            raise serializers.ValidationError("Phone number must start with 9 or 7 and be 9 digits long")
        
        return f"+251{value}"

class UploadProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['profile_pic']

    # profile_pic = serializers.ImageField()

    def validate_profile_pic(self, value):
        if value.size > 1048576:
            raise serializers.ValidationError("Profile picture size should be less than 1MB")
        
        elif value.content_type not in ['image/jpeg', 'image/png', 'image/jpg']:
            raise serializers.ValidationError("Profile picture should be a JPEG, PNG, or JPG file")

        return value

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            return DRFValidationError(e.messages)
        return value