from django.db import transaction, DatabaseError
from rest_framework import generics, views, permissions
from rest_framework.response import Response

from Users.models import student
from Classroom.models import classroom
from .models import Exam, Participants
from .serializers import (CreateExamSerializer, ExamSerializer, ExamListSerializer,
                          QuestionSerializer, ParticipantSerializer, CreateQuestionSerializer)


class createExamAPIView(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def __init__(self):
        super().__init__()
        self.list = []

    def post(self, request, *args, **kwargs):
        data = {
            'exam_name': self.request.data['exam']['exam_name'],
            'classroom': classroom.objects.get(id=self.request.data['exam']['classroom']).id,
            'total_marks': self.request.data['exam']['total_marks'],
            'submission_time': self.request.data['date']
        }
        try:
            with transaction.atomic():
                exam = CreateExamSerializer(data=data)
                exam.is_valid(raise_exception=True)
                exam = exam.save()

                for value in self.request.data['qsnSet']:
                    value['exam_name'] = exam.id
                    qsn = CreateQuestionSerializer(data=value)
                    qsn.is_valid(raise_exception=True)
                    qsn.save()
        except DatabaseError:
            return Response('Database Error')
        return Response(ExamSerializer(exam).data)


class ExamListAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ExamListSerializer

    def get_queryset(self):
        return classroom.objects.get(id=self.kwargs['id']).classroom_exam.all()


class QuestionAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = QuestionSerializer

    def get_queryset(self):
        classroom_object = classroom.objects.get(id=self.kwargs['class_id'])
        quiz_object = classroom_object.classroom_exam.get(exam_name=self.kwargs['quiz'])
        return quiz_object.question_set.all()


class participantAPIView(views.APIView):
    def post(self, request, *args, **kwargs):
        exam_object = Exam.objects.get(id=request.data.get('exam_id'))
        if exam_object.submitted.filter(id=self.request.user.id).exists():
            pass
        else:
            exam_object.submitted.add(self.request.user)
        participant = Participants.objects.create(exam_name=exam_object,
                                                  student_id=student.objects.get(name=self.request.user).varsity_id,
                                                  obtain_marks=request.data.get('obtain_marks'))
        return Response(ParticipantSerializer(participant).data)


class participantListAPIView(generics.ListAPIView):
    serializer_class = ParticipantSerializer

    def get_queryset(self):
        return Exam.objects.get(id=self.kwargs['id']).participants.all().distinct()
