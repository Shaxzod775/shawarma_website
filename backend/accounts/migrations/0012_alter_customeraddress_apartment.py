# Generated by Django 5.0.4 on 2024-04-28 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_alter_customeraddress_apartment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeraddress',
            name='apartment',
            field=models.CharField(blank=True, default='', max_length=15),
        ),
    ]