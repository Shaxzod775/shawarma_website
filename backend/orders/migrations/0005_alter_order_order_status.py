# Generated by Django 5.0.4 on 2024-05-03 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_alter_order_ordered_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('доставлено', 'Заказ Доставлен'), ('отменён', 'Заказ Отменён'), ('в_пути', 'Заказ в Пути')], default='в_пути', max_length=20),
        ),
    ]
