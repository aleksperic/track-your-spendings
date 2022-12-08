from django.urls import path

from .views import (
    scan_receipt_preview,
    receipt_create_view,
    receipt_detail_view,
    receipt_delete_view,
    receipt_list_view,
    )

urlpatterns = [
    path('', receipt_list_view),
    path('scan/', scan_receipt_preview),
    path('create/', receipt_create_view),
    path('<int:id>/', receipt_detail_view),
    path('<int:id>/delete', receipt_delete_view),
]