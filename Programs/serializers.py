from rest_framework import serializers
from .models import intake, program


class intakeSerializer(serializers.ModelSerializer):
    program_name = serializers.StringRelatedField()

    class Meta:
        model = intake
        fields = ['intake_name', 'program_name']


class programSerializer(serializers.ModelSerializer):
    class Meta:
        model = program
        fields = '__all__'
