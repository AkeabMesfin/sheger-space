from django.contrib import admin
from .models import User
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_buyer', 'is_agent', 'is_active', 'id')

admin.site.register(User, UserAdmin)