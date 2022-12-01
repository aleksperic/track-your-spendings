from django.db import models

# Create your models here.

class Receipt(models.Model):
    store = models.CharField(max_length=200)
    items = models.TextField()
    total_price = models.FloatField()
    tax_price = models.FloatField()
    purchase_date = models.DateField()
    purchase_time = models.TimeField()
    receipt_id = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)