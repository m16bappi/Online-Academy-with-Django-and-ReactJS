from rest_framework import serializers
from .models import assignments, assignment_participants


class assignmentSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)

    class Meta:
        model = assignments
        fields = ['id', 'title', 'body', 'posted_time', 'submission_time', 'submitted', 'status']


class createAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = assignments
        fields = '__all__'


class assignmentParticipantSerializer(serializers.ModelSerializer):
    student_name = serializers.StringRelatedField()

    class Meta:
        model = assignment_participants
        fields = ['assignment', 'file', 'student_name']
