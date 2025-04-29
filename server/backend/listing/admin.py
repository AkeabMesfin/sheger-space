from django.contrib import admin
from .models import Listing, SavedListings
# Register your models here.
class ListingAdmin(admin.ModelAdmin):
    list_display = ('listing_id', 'author', 'title', 'price', 'location', 'date', 'status')

admin.site.register(Listing, ListingAdmin)
admin.site.register(SavedListings)