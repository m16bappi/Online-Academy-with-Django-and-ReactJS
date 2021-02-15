from django.db import models
from Programs.models import program, intake
from Users.models import teacher, student
from Course.models import course
from django.contrib.auth.models import User


# Create classroom
class classroom(models.Model):
    class_code = models.CharField(max_length=10, blank=False, null=False, unique=True)
    class_name = models.CharField(max_length=50, blank=False, unique=True)
    course_name = models.ForeignKey(course, on_delete=models.CASCADE)
    program = models.ForeignKey(program, on_delete=models.CASCADE)
    intake = models.ForeignKey(intake, on_delete=models.CASCADE)
    students = models.ManyToManyField(student, related_name='students', blank=True)
    course_teacher = models.ForeignKey(teacher, related_name='course_teacher', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.class_name)
