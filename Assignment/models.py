from datetime import datetime

from django.contrib.auth.models import User
from django.db import models

from Classroom.models import classroom


# Create your models here.
class assignments(models.Model):
    title = models.CharField(max_length=100)
    body = models.CharField(max_length=1000)
    posted_time = models.DateTimeField(auto_now_add=True)
    submission_time = models.DateTimeField()
    submitted = models.ManyToManyField(User, blank=True)
    classroom = models.ForeignKey(classroom, related_name='assignments', on_delete=models.CASCADE)

    @property
    def status(self):
        return datetime.now() < self.submission_time

    def __str__(self):
        return self.title


class assignment_participants(models.Model):
    assignment = models.ForeignKey(assignments, related_name='assignment_participants', on_delete=models.CASCADE)
    file = models.FileField()
    file_text = models.TextField(null=True, blank=True)
    student_name = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.student_name.username
