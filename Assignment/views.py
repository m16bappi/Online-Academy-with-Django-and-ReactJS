from rest_framework import generics

from Classroom.models import classroom
from .serializers import assignmentSerializer


class assignmentListAPIView(generics.ListAPIView):
    serializer_class = assignmentSerializer

    def get_queryset(self):
        classroom_object = classroom.objects.get(class_name=self.kwargs['class_name'])
        return classroom_object.assignments.all()
