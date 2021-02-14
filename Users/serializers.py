from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.forms import authenticate
from django.core.exceptions import ObjectDoesNotExist
from .models import teacher, student


# user register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


# user login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect username or password')


# user info serializer
class UserSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField('status_method')

    @classmethod
    def status_method(cls, data):
        try:
            student.objects.get(name__username=data.username)
            return 'student'
        except ObjectDoesNotExist:
            return 'teacher'

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'status']


class studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = student
        fields = '__all__'
