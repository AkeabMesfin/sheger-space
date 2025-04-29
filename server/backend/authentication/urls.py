from django.urls import path
from . import views

urlpatterns = [
    path('auth/sign-up/', views.sign_up, name='sign_up'),
    path('auth/verify-account/<str:uidb64>/<str:token>/', views.verify_account, name='verify_account'),
    path('auth/login/', views.login, name='login'),
    path('auth/update-token/', views.update_token, name='update_token'),
    path('auth/forgot-password/', views.forgot_password, name='forgot_password'),
    path('auth/reset-password/<str:uidb64>/<str:token>/', views.reset_password, name='reset_password'),
    path('auth/edit-profile/', views.edit_profile, name='edit_profile'),
    path('auth/upload-profile-picture/', views.upload_profile_picture, name='upload_profile_picture'),
    path('auth/change-password/', views.change_password, name='change_password'),
]
