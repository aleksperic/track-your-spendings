# Generated by Django 4.1.3 on 2023-01-29 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('receipt', '0007_alter_receipt_receipt_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receipt',
            name='receipt_id',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
