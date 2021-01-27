from rest_framework import generics, views
from rest_framework import permissions

from Classroom.models import classroom
from .serializers import (ExamListSerializer)


class ExamAPIView(views.APIView):
    pass

class ExamListAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ExamListSerializer

    def get_queryset(self):
        print(self)
        return classroom.objects.get(class_name=self.kwargs['class_name']).classroom_exam.all()
