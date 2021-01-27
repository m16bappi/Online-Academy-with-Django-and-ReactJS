# Generated by Django 3.1.5 on 2021-01-27 11:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Exam', '0002_auto_20210127_1051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='submitted',
            field=models.ManyToManyField(blank=True, related_name='submitted', to=settings.AUTH_USER_MODEL),
        ),
    ]