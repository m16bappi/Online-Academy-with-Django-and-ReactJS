from rest_framework import serializers
from .models import Stream, Comment


class StreamSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    classroom = serializers.StringRelatedField()

    class Meta:
        model = Stream
        fields = '__all__'


class createStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = '__all__'


class createCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
