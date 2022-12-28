from rest_framework import serializers

from .models import Receipt

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = [
            'id',
            'user',
            'store', 
            'items', 
            'total_price', 
            'tax_price', 
            'purchase_date', 
            'purchase_time', 
            'receipt_id', 
            'receipt_org',
            ]

class ReceiptScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = [
            'store', 
            'items', 
            'total_price', 
            'tax_price', 
            'purchase_date', 
            'purchase_time', 
            'receipt_id', 
            'receipt_org',
            ]