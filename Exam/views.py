from rest_framework import generics, views

from Classroom.models import classroom
from .serializers import (ExamListSerializer)


class ExamAPIView(views.APIView):
    pass

class ExamListAPIView(generics.ListAPIView):
    serializer_class = ExamListSerializer

    def get_queryset(self):
        print(self)
        return classroom.objects.get(class_name=self.kwargs['class_name']).classroom_exam.all()
