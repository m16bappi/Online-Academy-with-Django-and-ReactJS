from rest_framework import generics, views, permissions
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response

from Classroom.models import classroom
from .models import Exam, Participants
from .serializers import (ExamListSerializer, QuestionSerializer, ParticipantSerializer, CreateParticipantSerializer)


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

class participantAPIView(views.APIView):
    def post(self, request, *args, **kwargs):
        exam_object = Exam.objects.get(id=request.data.get('id'))
        participant = Participants.objects.create(exam_name=exam_object, student_name=self.request.user, obtain_marks=request.data.get('obtain_marks'))
        return Response(ParticipantSerializer(participant).data)
