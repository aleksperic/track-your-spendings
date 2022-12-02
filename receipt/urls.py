from django.urls import path

from .views import scan_receipt

urlpatterns = [
    path('scan', scan_receipt),
]