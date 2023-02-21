from rest_framework import serializers

from .models import Receipt


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = [
            'id',
            'store', 
            'items', 
            'total_price', 
            'tax_price', 
            'purchase_date', 
            'purchase_time', 
            'receipt_id', 
            'receipt_org',
            ]
    
    def validate_receipt_id(self, value):
        obj = Receipt.objects.filter(receipt_id=value).first()
        if obj:
            raise serializers.ValidationError('Receipt alredy exists in the database.')
        return value

class ReceiptScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = [
            'id',
            'store', 
            'items', 
            'total_price', 
            'tax_price', 
            'purchase_date', 
            'purchase_time', 
            'receipt_id', 
            'receipt_org',
            ]