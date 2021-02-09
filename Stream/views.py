from rest_framework import generics

from .models import Comment, Stream
from .serializers import StreamSerializer, CommentSerializer


class StreamListAPIView(generics.ListAPIView):
    serializer_class = StreamSerializer

    def get_queryset(self):
        return Stream.objects.filter(classroom_id__exact=self.kwargs['id'])


class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        object = Stream.objects.filter(classroom_id__exact=self.kwargs['id'])
        return Comment.objects.filter(stream_id__in=object)
