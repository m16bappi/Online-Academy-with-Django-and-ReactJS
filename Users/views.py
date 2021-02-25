from django.db import transaction, DatabaseError
from knox.models import AuthToken
from rest_framework import generics, views
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.core.exceptions import ObjectDoesNotExist

from Programs.models import program
from .models import student, teacher
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, studentSerializer, teacherSerializer


# register api view
class registerApiView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        userData = {
            'username': self.request.data.get('username'),
            'email': self.request.data.get('email'),
            'password': self.request.data.get('password')
        }
        serializer = self.get_serializer(data=userData)
        try:
            with transaction.atomic():
                serializer.is_valid(raise_exception=True)
                user = serializer.save()
                if self.request.data.get('mode') == 'student':
                    data = {
                        'name': user.id,
                        'varsity_id': self.request.data.get('varsity_id'),
                        'intake': self.request.data.get('intake'),
                        'section': self.request.data.get('section'),
                        'phone': self.request.data.get('phone'),
                        'address': self.request.data.get('address'),
                        'dept': program.objects.get(program_title=self.request.data.get('dept')).id,
                        'photo': self.request.data.get('file')
                    }
                    st = studentSerializer(data=data)
                    st.is_valid(raise_exception=True)
                    object = st.save()
                else:
                    data = {
                        'name': user.id,
                        'phone': self.request.data.get('phone'),
                        'address': self.request.data.get('address'),
                        'dept': program.objects.get(program_title=self.request.data.get('dept')).id,
                        'photo': self.request.data.get('file')
                    }
                    th = teacherSerializer(data=data)
                    th.is_valid(raise_exception=True)
                    object = th.save()
        except DatabaseError:
            raise Response('Database Error')

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'profile': studentSerializer(object).data if self.request.data.get('mode') == 'student' else teacherSerializer(object).data,
            'token': AuthToken.objects.create(user)[1]
        })


# Login api view
class loginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        try:
            profile = student.objects.get(name=user)
            profile = studentSerializer(profile)
        except ObjectDoesNotExist:
            profile = teacher.objects.get(name=user)
            profile = teacherSerializer(profile)

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'profile': profile.data,
            'token': AuthToken.objects.create(user)[1]
        })


# user info api view
class userApiView(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, *args, **kwargs):
        try:
            profile = student.objects.get(name=self.request.user)
            profile = studentSerializer(profile)
        except ObjectDoesNotExist:
            profile = teacher.objects.get(name=self.request.user)
            profile = teacherSerializer(profile)
        return Response({
            'user': UserSerializer(self.request.user).data,
            'profile': profile.data
        })
