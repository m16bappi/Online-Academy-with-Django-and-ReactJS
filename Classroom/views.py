import random
import string

from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import generics, permissions, views
from rest_framework.response import Response

from Course.models import course
from Programs.models import program, intake
from Users.models import teacher, student
from .models import classroom
from .serializers import (classroomCreateSerializer, classroomJoinSerializer, classroomSerializer,
                          classroomListSerializer)


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

        class_name = [value for key, value in self.request.data.items()]
        class_name = '-'.join(value for value in class_name[:4])

        data = {
            'class_code': code,
            'class_name': class_name,
            'course_name': course.objects.get(course_code=self.request.data['course']).id,
            'program': program.objects.get(program_title=self.request.data['program']).id,
            'intake': intake.objects.get(intake_name=self.request.data['intake']).id,
            'url': self.request.data['url']
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        object = serializer.save(class_code=code, course_teacher=teacher.objects.get(name=self.request.user))
        return Response(classroomSerializer(object).data)


class teacherClassroomAPIView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = classroomSerializer

    def get_queryset(self):
        return classroom.objects.filter(course_teacher=teacher.objects.get(name=self.request.user))


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
        classroom_object = classroom.objects.get(id=self.request.data['id'])
        if classroom_object.class_code == key:
            if classroom_object.students.filter(id=student.objects.get(name=self.request.user).id).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                classroom_object.students.add(student.objects.get(name=self.request.user))
                return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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
