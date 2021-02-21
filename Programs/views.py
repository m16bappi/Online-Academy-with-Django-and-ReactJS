from rest_framework import generics

from .models import program, intake
from .serializers import intakeSerializer, programSerializer


# Create your views here.
class intakeAPIView(generics.ListAPIView):
    serializer_class = intakeSerializer

    def get_queryset(self):
        dept = program.objects.get(program_title=self.kwargs.get('program'))
        return intake.objects.filter(program_name=dept)


class programAPIView(generics.ListAPIView):
    queryset = program.objects.all()
    serializer_class = programSerializer
