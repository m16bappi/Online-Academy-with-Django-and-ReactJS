from django.db import transaction, DatabaseError
from knox.models import AuthToken
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response

from Programs.models import program
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, studentSerializer


# register api view
class registerApiView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data.get('user'))
        try:
            with transaction.atomic():
                serializer.is_valid(raise_exception=True)
                user = serializer.save()
                data = {
                    'name': user.id,
                    'varsity_id': self.request.data.get('student')['varsity_id'],
                    'intake': self.request.data.get('student')['intake'],
                    'section': self.request.data.get('student')['section'],
                    'phone': self.request.data.get('student')['phone'],
                    'address': self.request.data.get('student')['address'],
                    'dept': program.objects.get(id=self.request.data.get('student')['dept']).id
                }

                st = studentSerializer(data=data)
                st.is_valid(raise_exception=True)
                st.save()
        except DatabaseError:
            return Response('Database Error')
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


# Login api view
class loginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


# user info api view
class userApiView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
