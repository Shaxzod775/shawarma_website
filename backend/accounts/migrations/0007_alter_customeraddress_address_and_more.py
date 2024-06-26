# Generated by Django 5.0.4 on 2024-04-26 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_customeraddress_apartment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customeraddress',
            name='address',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='customeraddress',
            name='apartment',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AlterField(
            model_name='customeraddress',
            name='comments',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='customeraddress',
            name='intercom',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
