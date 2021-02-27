from rest_framework import generics, permissions
from rest_framework.response import Response

from Classroom.models import classroom
from .models import Comment, Stream
from .serializers import StreamSerializer, CommentSerializer, createStreamSerializer, createCommentSerializer


class createStreamAPIView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = createStreamSerializer

    def post(self, request, *args, **kwargs):
        data = {
            'title': self.request.data['title'],
            'body': self.request.data['body'],
            'classroom': classroom.objects.get(id=self.request.data['id']),
            'user': self.request.user
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(exception_raise=True)
        object = serializer.save()
        return Response(StreamSerializer(object).data)


class StreamListAPIView(generics.ListAPIView):
    serializer_class = StreamSerializer

    def get_queryset(self):
        return Stream.objects.filter(classroom_id__exact=self.kwargs['id'])


class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        object = Stream.objects.filter(classroom_id__exact=self.kwargs['id'])
        return Comment.objects.filter(stream_id__in=object)
