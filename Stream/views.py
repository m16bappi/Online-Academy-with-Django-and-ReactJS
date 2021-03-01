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
            'body': self.request.data['textarea'],
            'classroom': classroom.objects.get(id=self.request.data['id']).id,
            'user': self.request.user.id
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        object = serializer.save()
        return Response(StreamSerializer(object).data)


class StreamListAPIView(generics.ListAPIView):
    serializer_class = StreamSerializer

    def get_queryset(self):
        return Stream.objects.filter(classroom_id__exact=self.kwargs['id'])


class createCommentAPIView(generics.CreateAPIView):
    serializer_class = createCommentSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        data = {
            'comment': self.request.data['comment'],
            'stream': Stream.objects.get(id=self.request.data['id']).id,
            'user': self.request.user.id
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        object = serializer.save()
        return Response(CommentSerializer(object).data)


class CommentListAPIView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        object = Stream.objects.filter(classroom_id__exact=self.kwargs['id'])
        return Comment.objects.filter(stream_id__in=object)
