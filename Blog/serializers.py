from rest_framework import serializers
from .models import Blogs, Comments


class BlogsSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Blogs
        fields = ['id', 'author', 'title', 'cover', 'blog', 'likes', 'created_time', 'category']


class BlogsCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
