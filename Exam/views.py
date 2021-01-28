from rest_framework import generics, views
from rest_framework import permissions

from Classroom.models import classroom
from .serializers import (ExamListSerializer, QuestionSerializer)


class ExamAPIView(views.APIView):
    pass

class ExamListAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExamListSerializer

    def get_queryset(self):
        return classroom.objects.get(class_name=self.kwargs['class_name']).classroom_exam.all()

class QuestionAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuestionSerializer

    def get_queryset(self):
        classroom_object = classroom.objects.get(class_name=self.kwargs['class_name'])
        quiz_object = classroom_object.classroom_exam.get(exam_name=self.kwargs['quiz'])
        return quiz_object.question_set.all()
