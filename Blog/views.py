from rest_framework import permissions, generics, status, views
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Blogs
from .serializers import BlogsSerializer


class BlogsAddAPIView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    parser_classes = [MultiPartParser]

    serializer_class = BlogsSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlogsAPIView(generics.ListAPIView):
    serializer_class = BlogsSerializer
    queryset = Blogs.objects.all()


class BlogDestroyAPIView(generics.DestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Blogs.objects.all()

    def destroy(self, request, *args, **kwargs):
        blog = self.get_object()
        if blog.author == self.request.user:
            self.perform_destroy(blog)
            return Response({
                'success message': 'deleted successfully'
            })
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
