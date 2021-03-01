from django.db import models
from django.contrib.auth.models import User

from Classroom.models import classroom


class Stream(models.Model):
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    classroom = models.ForeignKey(classroom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.body


class Comment(models.Model):
    comment = models.CharField(max_length=500)
    stream = models.ForeignKey(Stream, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment
