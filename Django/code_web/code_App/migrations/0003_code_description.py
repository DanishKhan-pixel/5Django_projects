# Generated by Django 5.1 on 2024-08-15 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('code_App', '0002_alter_code_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='code',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
