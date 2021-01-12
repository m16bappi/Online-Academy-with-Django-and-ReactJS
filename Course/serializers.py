from rest_framework import serializers, validators
from rest_framework.validators import UniqueValidator
from .models import course


class courseListSerializer(serializers.ModelSerializer):
    dept = serializers.StringRelatedField()

    class Meta:
        model = course
        fields = '__all__'


class courseAddSerializer(serializers.ModelSerializer):
    course_code = serializers.CharField(validators=[UniqueValidator(
        queryset=course.objects.all(),
        message='Such course already exists'
    )])

    class Meta:
        model = course
        fields = '__all__'
