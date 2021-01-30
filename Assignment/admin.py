from django.contrib import admin

from .models import assignments, assignment_participants
# Register your models here.

admin.site.register(assignments)
admin.site.register(assignment_participants)
