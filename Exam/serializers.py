from rest_framework import serializers
from .models import Exam, Question, Participants

class ExamSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)

    class Meta:
        model = Exam
        fields = ['exam_name', 'total_marks', 'time_duration', 'submitted']

class CreateExamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exam
        fields = '__all__'

class ExamListSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)

    class Meta:
        model = Exam
        fields = ['exam_name', 'total_marks', 'rules', 'posted_time', 'submission_time', 'status', 'submitted']

class QuestionSerializer(serializers.ModelSerializer):
    exam_name = serializers.StringRelatedField()

    class Meta:
        model = Question
        fields = '__all__'

class CreateQuestionSerializer(serializers.ModelSerializer):
    pass

class ParticipantSerializer(serializers.ModelSerializer):
    pass

class CreateParticipantSerializer(serializers.ModelSerializer):
    pass
