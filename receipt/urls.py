from django.urls import path

from .views import scan_receipt_preview

urlpatterns = [
    path('scan/', scan_receipt_preview),
]