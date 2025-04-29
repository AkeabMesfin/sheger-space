from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=True)
    username = None
    email = models.EmailField(unique=True, blank=False)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True)
    phone = models.CharField(max_length=255 ,blank=True)
    password = models.CharField(max_length=255, blank=False)
    is_buyer = models.BooleanField(default=True)
    is_agent = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    object = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

class CustomUserManager(BaseUserManager):
   def _create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user
