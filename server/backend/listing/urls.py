from django.urls import path
from . import views

urlpatterns = [
    path('listing/browse-listings/', views.browse_listings, name="browse-listings"),
    path('listing/listing-details/<uuid:listing_id>', views.listing_details, name="listing-details"),
    path('listing/add-listing/', views.add_listing, name="add-listing"),
    path('listing/edit-listing/<uuid:listing_id>', views.edit_listing, name="edit-listing"),
    path('listings/my-listings/', views.my_listings, name="my-listings"),
    path('listings/delete-listing/<uuid:listing_id>', views.delete_listing, name='delete-listing'),
    path('listings/save-listing/<uuid:listing_id>', views.save_listing, name='save-listing'),
    path('listings/saved-listings', views.saved_listings, name='saved-listings'),
    path('listings/total-listings', views.total_listings, name='total-listings'),
    path('listings/total-saved-listings', views.total_saved_listings, name='total-saved-listings'),
]

