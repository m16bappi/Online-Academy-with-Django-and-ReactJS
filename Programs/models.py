from django.db import models


# Create your models here.
class program(models.Model):
    program_choice = (
        ('CSE', 'CSE'),
        ('BBA', 'BBA'),
        ('EEE', 'EEE'),
        ('LL.B', 'LL.B'),
        ('TEXTILE', 'TEXTILE'),
        ('ENGLISH', 'ENGLISH'),
        ('ECONOMICS', 'ECONOMICS')
    )

    program_title = models.CharField(max_length=20, choices=program_choice)

    def __str__(self):
        return self.program_title


class intake(models.Model):
    intake_name = models.CharField(max_length=50, null=False, blank=False)
    program_name = models.ForeignKey(program, on_delete=models.CASCADE)

    def __str__(self):
        return self.intake_name
