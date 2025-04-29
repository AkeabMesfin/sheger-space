from django.db import models
from authentication.models import User
from uuid import uuid4

# Create your models here.
class Listing(models.Model):
    listing_id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    image_1 = models.ImageField(upload_to='listing-images/', blank=False)
    image_2 = models.ImageField(upload_to='listing-images/', blank=True)
    image_3 = models.ImageField(upload_to='listing-images/', blank=True)
    title = models.CharField(max_length=40, blank=False)
    phone = models.PositiveIntegerField(default=0, blank=True)
    description = models.TextField(max_length=255, blank=False)
    price = models.PositiveIntegerField(default=0, blank=False)
    LOCATION = [
        ('AddisKetema', 'Addis Ketema'),
        ('AkakyKaliti', 'Akaky Kaliti'),
        ('Arada', 'Arada'),
        ('Bole', 'Bole'),
        ('Gullele', 'Gullele'),
        ('Kirkos', 'Kirkos'),
        ('KolfeKeranio', 'Kolfe Keranio'),
        ('Lideta', 'Lideta'),
        ('NifasSilkLafto', 'Nifas Silk-Lafto'),
        ('Yeka', 'Yeka'),
    ]

    location = models.CharField(max_length=255, blank=False, choices=LOCATION)
    date = models.DateTimeField(auto_now_add=True)
    STATUS = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('sold', 'Sold'),
    ]

    status = models.CharField(max_length=10, choices=STATUS, default='active')

    def __str__(self):
        return str(self.listing_id)


    
    def count_saved(self):
        return self.saved.count()

class SavedListings(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('listing', 'user')