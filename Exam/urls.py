from django.urls import path
from .views import ExamListAPIView

urlpatterns = [
    path('api/classroom/examlist/<str:class_name>/', ExamListAPIView.as_view())
]
