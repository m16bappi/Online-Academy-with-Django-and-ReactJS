from rest_framework import permissions
from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from django.core.exceptions import ObjectDoesNotExist

from Classroom.models import classroom
from .serializers import assignmentSerializer, assignmentParticipantSerializer, createAssignmentSerializer
from .models import assignments, assignment_participants


class createAssignmentAPIView(generics.GenericAPIView):
    serializer_class = createAssignmentSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        data = self.request.data
        data['classroom'] = classroom.objects.get(id=self.kwargs.get('id')).id
        object = createAssignmentSerializer(data=data)
        object.is_valid(raise_exception=True)
        object = object.save()
        return Response(assignmentSerializer(object).data)


class assignmentListAPIView(generics.ListAPIView):
    serializer_class = assignmentSerializer

    def get_queryset(self):
        classroom_object = classroom.objects.get(id=self.kwargs['id'])
        return classroom_object.assignments.all()


class assignmentParticipantAPIView(views.APIView):
    parser_classes = [MultiPartParser, FileUploadParser]

    def post(self, request):
        try:
            assignment = assignments.objects.get(id=request.data.get('id'))
            if assignment.submitted.filter(id=self.request.user.id).exists():
                pass
            else:
                assignment.submitted.add(self.request.user)

            participant = assignment_participants.objects.create(assignment=assignment, file=request.data.get('file'),
                                                                 student_name=self.request.user)
            return Response(assignmentParticipantSerializer(participant).data)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class assignmentParticipantListAPIView(generics.ListAPIView):
    serializer_class = assignmentParticipantSerializer

    def get_queryset(self):
        return assignments.objects.get(id=self.kwargs['id']).assignment_participants.all().distinct()
