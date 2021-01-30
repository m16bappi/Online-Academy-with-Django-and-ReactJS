from rest_framework import serializers
from .models import assignments, assignment_participants

class assignmentSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)
    classroom = serializers.StringRelatedField()

    class Meta:
        model = assignments
        fields = '__all__'

class createAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignments
        fields = '__all__'

class assignmentParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignment_participants
        fields = '__all__'
