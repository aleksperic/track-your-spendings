from django.urls import path

from .views import (
    scan_receipt_preview,
    receipt_create_view,
    receipt_detail_view,
    receipt_delete_view,
    receipt_list_view,
    )

urlpatterns = [
    path('', receipt_list_view, name='home'),
    path('scan/', scan_receipt_preview, name='scan'),
    path('create/', receipt_create_view, name='create'),
    path('<int:id>/', receipt_detail_view, name='detail'),
    path('<int:id>/delete', receipt_delete_view, name='delete'),
]