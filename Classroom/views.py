import random
import string

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, views
from rest_framework.response import Response

from Programs.models import program
from Users.models import teacher, student
from .models import classroom
from .serializers import (classroomCreateSerializer, classroomJoinSerializer, classroomSerializer,
                          classroomIntakeListSerializer, classroomListSerializer)


class classroomCreateAPIView(generics.CreateAPIView):
    serializer_class = classroomCreateSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def create(self, request, *args, **kwargs):
        try:
            teacher.objects.get(name=self.request.user)
        except ObjectDoesNotExist:
            return Response({'message': 'teacher profile not found'})
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        object = serializer.save(class_code=code, course_teacher=get_object_or_404(teacher, name=self.request.user))
        return Response({
            'message': 'class created',
            'classroom': classroomSerializer(object).data
        })


class classroomListAPIView(generics.ListAPIView):
    serializer_class = classroomSerializer
    queryset = classroom.objects.all()


class classroomJoinAPIView(views.APIView):
    serializer_class = classroomJoinSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        try:
            student.objects.get(name=self.request.user)
        except ObjectDoesNotExist:
            return Response({'message': 'your profile not found'})

        key = request.data.get('code')
        classroom_object = classroom.objects.get(pk=kwargs['pk'])
        if classroom_object.class_code == key:
            if classroom_object.students.filter(id=student.objects.get(name=self.request.user).id).exists():
                classroom_object.students.remove(student.objects.get(name=self.request.user))
                return Response({
                    'message': 'unrolled from class',
                    'classroom': classroomSerializer(classroom_object).data
                })
            else:
                classroom_object.students.add(student.objects.get(name=self.request.user))
                return Response({
                    'message': 'you are joined the class',
                    'classroom': classroomSerializer(classroom_object).data
                })
        else:
            return Response({
                'Message': 'your class code is wrong',
            })


class myClassroomAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = classroomListSerializer

    def get_queryset(self):
        try:
            classroom_list = student.objects.get(name=self.request.user).students.all()
            return classroom_list
        except ObjectDoesNotExist:
            return None


class classroomAPIView(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = classroomSerializer

    def get(self, request, *args, **kwargs):
        get_classroom = classroom.objects.get(id=kwargs['id'])
        return Response({
            'classroom': classroomSerializer(get_classroom).data
        })
