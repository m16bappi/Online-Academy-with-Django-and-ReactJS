from django.db import models
from Programs.models import program


# Create your models here.
class course(models.Model):
    course_code = models.CharField(max_length=10, blank=False, null=False, unique=True)
    course_title = models.CharField(max_length=100, blank=False, null=False)
    dept = models.ForeignKey(program, null=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.course_code
