# Generated by Django 3.1.5 on 2021-01-27 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Exam', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer',
            field=models.CharField(choices=[('Exam', 'option1'), ('B', 'option2'), ('C', 'option3'), ('D', 'option4')], max_length=4),
        ),
    ]