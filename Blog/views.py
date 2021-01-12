from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .models import Blogs, Comments
from .serializers import BlogsSerializer, BlogsListSerializer


class BlogsAddAPIView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = BlogsSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlogsAPIView(generics.ListAPIView):
    serializer_class = BlogsListSerializer
    queryset = Blogs.objects.all()


class BlogRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = BlogsListSerializer
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
            return Response({
                'error': 'user error'
            })
