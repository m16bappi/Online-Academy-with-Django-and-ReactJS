from rest_framework import serializers
from .models import Exam, Question, Participants


class ExamSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)

    class Meta:
        model = Exam
        fields = ['id', 'exam_name', 'classroom', 'total_marks', 'submission_time', 'posted_time', 'submitted', 'status']


class CreateExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'


class ExamListSerializer(serializers.ModelSerializer):
    submitted = serializers.StringRelatedField(many=True)

    class Meta:
        model = Exam
        fields = ['id', 'exam_name', 'total_marks', 'posted_time', 'submission_time', 'status', 'submitted']


class QuestionSerializer(serializers.ModelSerializer):
    exam_name = serializers.StringRelatedField()

    class Meta:
        model = Question
        fields = '__all__'


class CreateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    exam_name = serializers.StringRelatedField()

    class Meta:
        model = Participants
        fields = '__all__'
