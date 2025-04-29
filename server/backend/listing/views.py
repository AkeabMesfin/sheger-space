from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Listing, SavedListings
from .serializers import  AddListingSerializer, ListingSerializer, EditListingSerializer, SavedListingsSerializer


@api_view(['GET'])
def browse_listings(request):
    listings = Listing.objects.all()

    search = request.query_params.get('search', None)
    location = request.query_params.get('location', None)
    price = request.query_params.get('price', None)

    if search:
        listings = listings.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search)
        )

    if location and location.lower() != "all":
        listings = listings.filter(location__icontains=location)

    if price and price.lower() != "all":
        price_range = price.split("-")
        if len(price_range) == 2:
            try:
                min_price = int(price_range[0])
                max_price = int(price_range[1])
                listings = listings.filter(price__gte=min_price, price__lte=max_price)
            except ValueError:
                pass  

    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def listing_details(request, listing_id):
    try:
        listing = Listing.objects.get(listing_id=listing_id)
    except Listing.DoesNotExist:
        return Response({"detail": "Listing not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = ListingSerializer(listing)
    return Response(serializer.data, status=status.HTTP_200_OK)

    

@api_view(['POST'])
def add_listing(request):
    user = request.user
    if not user.is_agent:
        return Response({"detail": "You must be an agent to add a listing."}, status=status.HTTP_403_FORBIDDEN)
    serializers = AddListingSerializer(data=request.data, context={'request': request})
    if serializers.is_valid():
        
        serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)
    print(serializers.errors)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
# @permission_classes([IsAuthenticated])  
def edit_listing(request, listing_id):
    user = request.user
    if not user.is_agent:
        return Response({"detail": "You must be an agent to edit a listing."}, status=status.HTTP_403_FORBIDDEN)

    try:
        listing = Listing.objects.get(listing_id=listing_id)
    except Listing.DoesNotExist:
        return Response({"detail": "Listing not found."}, status=status.HTTP_404_NOT_FOUND)

    if listing.author != request.user:
        return Response({"detail": "You do not have permission to edit this listing."}, status=status.HTTP_403_FORBIDDEN)

    data_to_update = {}

    if 'title' in request.data and request.data['title'] != listing.title:
        data_to_update['title'] = request.data['title']
    if 'location' in request.data and request.data['location'] != listing.location:
        data_to_update['location'] = request.data['location']
    if 'phone' in request.data and request.data['phone'] != listing.phone:
        data_to_update['phone'] = request.data['phone']
    if 'price' in request.data and request.data['price'] != listing.price:
        data_to_update['price'] = request.data['price']
    if 'description' in request.data and request.data['description'] != listing.description:
        data_to_update['description'] = request.data['description']
    if 'image_1' in request.data and request.data['image_1'] != listing.image_1:
        data_to_update['image_1'] = request.data['image_1']
    if 'image_2' in request.data and request.data['image_2'] != listing.image_2:
        data_to_update['image_2'] = request.data['image_2']
    if 'image_3' in request.data and request.data['image_3'] != listing.image_3:
        data_to_update['image_3'] = request.data['image_3']
    if 'status' in request.data and request.data['status'] != listing.status:
        data_to_update['status'] = request.data['status']

    if data_to_update:
        serializer = EditListingSerializer(listing, data=data_to_update, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    else:
        return Response({"message": "No changes made."}, status=status.HTTP_200_OK)

@api_view(["GET"])
def my_listings(request):
    listings = Listing.objects.filter(author=request.user)
    serializer = ListingSerializer(listings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
def delete_listing(request, listing_id):
    listing = Listing.objects.get(listing_id=listing_id)
    listing.delete()
    return Response(status=status.HTTP_204_NO_CONTENT, data={"message": "Listing deleted."})


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def save_listing(request, listing_id):
    try:
        listing = Listing.objects.get(listing_id=listing_id)
        saved_listing = SavedListings.objects.filter(user=request.user, listing=listing).first()

        if saved_listing:
            saved_listing.delete()
            return Response(status=status.HTTP_200_OK, data={"message": "Listing unsaved."})
        else:
            SavedListings.objects.create(user=request.user, listing=listing)
            return Response(status=status.HTTP_200_OK, data={"message": "Listing saved."})

    except Listing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Listing not found."})

@api_view(["GET"])
def saved_listings(request):
    saved_listings = SavedListings.objects.filter(user=request.user)
    serializer = SavedListingsSerializer(saved_listings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def total_listings(request):
    author = request.user  # The currently logged-in user

    total_listings = Listing.objects.filter(author=author).count()
    pending_listings = Listing.objects.filter(author=author, status="pending").count()
    active_listings = Listing.objects.filter(author=author, status="active").count()
    sold_listings = Listing.objects.filter(author=author, status="sold").count()

    return Response({
        "total_listings": total_listings,
        "pending": pending_listings,
        "active": active_listings,
        "sold": sold_listings
    }, status=status.HTTP_200_OK)

@api_view(["GET"])
def total_saved_listings(request):
    total_saved_listings = SavedListings.objects.filter(user=request.user).count()
    return Response({"total_saved_listings": total_saved_listings}, status=status.HTTP_200_OK)