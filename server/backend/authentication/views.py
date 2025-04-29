from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.urls import reverse
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from .models import User
from .serializers import SignUpSerializer, LoginSerializer, UpdateTokenSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, EditProfileSerializer, UploadProfileSerializer, ChangePasswordSerializer
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def sign_up(request):
    serializers = SignUpSerializer(data=request.data)
    if serializers.is_valid():
        user = serializers.save()
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        activation_link = f"http://localhost:5173/verify-account/{uid}/{token}" 

        email_subject = "Activate Your Account"
        email_body = f"Hi {user.first_name},\n\nPlease activate your account by clicking the link below:\n{activation_link}"

        email = EmailMessage(
            email_subject,
            email_body,
            settings.EMAIL_HOST_USER,
            [user.email],
        )
        email.send(fail_silently=False)

        return Response(serializers.data, status=status.HTTP_201_CREATED)

    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def verify_account(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    token_generator = PasswordResetTokenGenerator()

    if user and token_generator.check_token(user, token):
        user.is_active = True
        user.save()

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        access_token['email'] = user.email
        access_token['first_name'] = user.first_name
        access_token['last_name'] = user.last_name
        access_token['is_buyer'] = user.is_buyer
        access_token['is_agent'] = user.is_agent
        access_token['phone'] = user.phone
        access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

        return Response({"message": "Account activated successfully!", "access": str(access_token), "refresh": str(refresh)}, status=200)
    else:
        return Response({"error": "Activation link is invalid!"}, status=400)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)

            access_token = refresh.access_token
            access_token['email'] = user.email
            access_token['first_name'] = user.first_name
            access_token['last_name'] = user.last_name
            access_token['is_buyer'] = user.is_buyer
            access_token['is_agent'] = user.is_agent
            access_token['phone'] = user.phone
            access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

            return Response({"access": str(access_token), "refresh": str(refresh)}, status=200)
        
        elif user not in User.objects.all():
            return Response({"error": "User does not exist"}, status=400)

        elif user and not user.is_active:
            return Response({"error": "Account is not active"}, status=400)

        else:
            return Response({"error": "Invalid email or password"}, status=400)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_token(request):
    serializer = UpdateTokenSerializer(data=request.data)

    if serializer.is_valid():
        old_token = serializer.validated_data['refresh_token']

        if old_token is None:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            old_refresh = RefreshToken(old_token)
            user_id = old_refresh.payload.get('user_id') 
            if not user_id:
                return Response({'error': 'No user associated with the refresh token'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.get(id=user_id) 
            old_refresh.blacklist() 
            new_refresh = RefreshToken.for_user(user)
            new_access = new_refresh.access_token

            new_access['email'] = user.email
            new_access['first_name'] = user.first_name
            new_access['last_name'] = user.last_name
            new_access['is_buyer'] = user.is_buyer
            new_access['is_agent'] = user.is_agent
            new_access['is_active'] = user.is_active
            new_access['phone'] = user.phone
            new_access['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

            return Response({
                'access': str(new_access),
                'refresh': str(new_refresh)
            }, status=status.HTTP_200_OK)

        except Exception as e:
            print(e) 
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def forgot_password(request):
    serializer = ForgotPasswordSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()

        if user:
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            password_reset_link = f"http://localhost:5173/reset-password/{uid}/{token}" 

            email_subject = "Reset Your Password"
            email_body = f"Hi {user.first_name},\n\nPlease reset your password by clicking the link below:\n{password_reset_link}"

            email = EmailMessage(
                email_subject,
                email_body,
                settings.EMAIL_HOST_USER,
                [user.email],
            )
            email.send(fail_silently=False)

            return Response({"message": "Password reset link sent successfully!"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def reset_password(request, uidb64, token):
    serializer = ResetPasswordSerializer(data=request.data)

    if serializer.is_valid():
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        token_generator = PasswordResetTokenGenerator()

        if user and token_generator.check_token(user, token):
            user.set_password(serializer.validated_data['new_password'])
            user.save()

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            access_token['email'] = user.email
            access_token['first_name'] = user.first_name
            access_token['last_name'] = user.last_name
            access_token['is_buyer'] = user.is_buyer
            access_token['is_agent'] = user.is_agent
            access_token['phone'] = user.phone
            access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

            return Response({"access": str(access_token), "refresh": str(refresh)}, status=status.HTTP_200_OK)

        else:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user  
    data_to_update = {}

    email_changed = False

    if 'email' in request.data and request.data['email'] != user.email:
        data_to_update['email'] = request.data['email']
        email_changed = True
        user.is_active = False  

    if 'first_name' in request.data and request.data['first_name'] != user.first_name:
        data_to_update['first_name'] = request.data['first_name']
    if 'last_name' in request.data and request.data['last_name'] != user.last_name:
        data_to_update['last_name'] = request.data['last_name']
    if 'phone' in request.data and request.data['phone'] != user.phone:
        data_to_update['phone'] = request.data['phone']

    if data_to_update:
        serializer = EditProfileSerializer(user, data=data_to_update, partial=True)
        if serializer.is_valid():
            serializer.save()

            if email_changed:
                token = PasswordResetTokenGenerator().make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))

                activation_link = f"http://localhost:5173/verify-account/{uid}/{token}"

                email_subject = "Activate Your Account"
                email_body = f"Hi {user.first_name},\n\nPlease activate your account by clicking the link below:\n{activation_link}"

                email = EmailMessage(
                    email_subject,
                    email_body,
                    settings.EMAIL_HOST_USER,
                    [user.email],
                )
                email.send(fail_silently=False)

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
            access_token['email'] = user.email
            access_token['first_name'] = user.first_name
            access_token['last_name'] = user.last_name
            access_token['is_buyer'] = user.is_buyer
            access_token['is_agent'] = user.is_agent
            access_token['phone'] = user.phone
            access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

            return Response({
                "access": str(access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"message": "No changes made."}, status=status.HTTP_200_OK)



@api_view(['PATCH'])
def upload_profile_picture(request):
    user = request.user  
    profile_serializer = UploadProfileSerializer(user, data=request.data, partial=True)
    if profile_serializer.is_valid():
        profile_serializer.save()

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        access_token['email'] = user.email
        access_token['first_name'] = user.first_name
        access_token['last_name'] = user.last_name
        access_token['is_buyer'] = user.is_buyer
        access_token['is_agent'] = user.is_agent
        access_token['phone'] = user.phone
        access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

        return Response({
            "access": str(access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)
    
    else:
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def change_password(request):
    user = request.user  
    password_serializer = ChangePasswordSerializer(user, data=request.data, partial=True)
    if password_serializer.is_valid():
        current_password = password_serializer.validated_data['current_password']
        new_password = password_serializer.validated_data['new_password']

        if user.check_password(current_password):
            user.set_password(new_password)
            user.save()

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            access_token['email'] = user.email
            access_token['first_name'] = user.first_name
            access_token['last_name'] = user.last_name
            access_token['is_buyer'] = user.is_buyer
            access_token['is_agent'] = user.is_agent
            access_token['phone'] = user.phone
            access_token['profile_pic'] = user.profile_pic.url if user.profile_pic else ""

            return Response({
                "access": str(access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid current password"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(password_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

