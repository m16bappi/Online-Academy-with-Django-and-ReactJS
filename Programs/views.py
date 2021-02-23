from rest_framework import generics

from .models import program, intake
from .serializers import intakeSerializer, programSerializer


# Create your views here.
class intakeAPIView(generics.ListAPIView):
    serializer_class = intakeSerializer
    queryset = intake.objects.all()


class programAPIView(generics.ListAPIView):
    queryset = program.objects.all()
    serializer_class = programSerializer
