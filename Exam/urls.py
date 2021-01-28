from django.urls import path
from .views import ExamListAPIView, QuestionAPIView

urlpatterns = [
    path('api/classroom/exam/questions/<str:class_name>/<str:quiz>/', QuestionAPIView.as_view()),
    path('api/classroom/exam/list/<str:class_name>/', ExamListAPIView.as_view())
]
