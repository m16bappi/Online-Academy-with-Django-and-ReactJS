from rest_framework import generics
from rest_framework.response import Response
from .models import course
from .serializers import courseListSerializer, courseAddSerializer


# course list
class courseListAPIView(generics.ListAPIView):
    serializer_class = courseListSerializer
    queryset = course.objects.all()


# course add
class courseAddAPIView(generics.CreateAPIView):
    serializer_class = courseAddSerializer
    queryset = course.objects.all()
