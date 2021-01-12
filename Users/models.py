from django.db import models
from django.contrib.auth.models import User
from Programs.models import program

class student(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    varsity_id = models.IntegerField(unique=True, blank=False, null=False)
    intake = models.IntegerField()
    section = models.IntegerField()
    dept = models.ForeignKey(program, on_delete=models.CASCADE)
    photo = models.ImageField(default='default.jpg', upload_to='profile_pics')

    phone = models.IntegerField()
    address = models.CharField(max_length=150)

    def __str__(self):
        return self.name.username


class teacher(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    dept = models.ForeignKey(program, on_delete=models.CASCADE)
    phone = models.IntegerField()
    address = models.CharField(max_length=150)
    photo = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return self.name.username
