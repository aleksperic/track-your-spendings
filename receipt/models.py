from django.db import models
from django.contrib.auth.models import User


class Receipt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.CharField(max_length=200)
    items = models.TextField(blank=True, null=True)
    total_price = models.FloatField()
    tax_price = models.FloatField()
    purchase_date = models.DateField()
    purchase_time = models.TimeField(blank=True, null=True)
    receipt_id = models.CharField(max_length=200, blank=True, null=True)
    receipt_org = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.store} - {self.total_price}'