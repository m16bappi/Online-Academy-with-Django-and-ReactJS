from rest_framework import serializers
from .models import Blogs, Comments


class BlogsListSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    likes = serializers.StringRelatedField(many=True)

    class Meta:
        model = Blogs
        fields = ['id', 'author', 'title', 'blog', 'cover', 'likes', 'created_time']


class BlogsSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()

    class Meta:
        model = Blogs
        fields = ['id', 'author', 'title', 'cover', 'blog', 'likes', 'created_time']


class BlogsCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
