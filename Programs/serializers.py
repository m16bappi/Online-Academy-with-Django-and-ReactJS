from rest_framework import serializers
from .models import intake, program

class intakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = intake
        fields = '__all__'


class programSerializer(serializers.ModelSerializer):
    class Meta:
        model = program
        fields = '__all__'
