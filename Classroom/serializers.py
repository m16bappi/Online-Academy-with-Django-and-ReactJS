from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import classroom


class classroomSerializer(serializers.ModelSerializer):
    program = serializers.StringRelatedField()
    course_teacher = serializers.StringRelatedField()
    students = serializers.StringRelatedField(many=True)
    intake = serializers.StringRelatedField()
    course_name = serializers.StringRelatedField()

    class Meta:
        model = classroom
        fields = '__all__'


class classroomCreateSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(validators=[UniqueValidator(
        queryset=classroom.objects.all(),
        message='classroom already exist'
    )])

    class Meta:
        model = classroom
        fields = ['class_name', 'course_name', 'program', 'course_teacher', 'intake']


class classroomJoinSerializer(serializers.Serializer):
    code = serializers.CharField()


class classroomIntakeListSerializer(serializers.Serializer):
    program = serializers.CharField()
    intake = serializers.CharField()

class myClassroomSerializer(serializers.ModelSerializer):
    program = serializers.StringRelatedField()
    course_teacher = serializers.StringRelatedField()
    intake = serializers.StringRelatedField()
    class_name = serializers.StringRelatedField()

    class Meta:
        model = classroom
        fields = ['class_name', 'program', 'intake', 'course_teacher']

class classroomListSerializer(serializers.ModelSerializer):
    class_name = serializers.StringRelatedField()

    class Meta:
        model = classroom
        fields = ['class_name']
