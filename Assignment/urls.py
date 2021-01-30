from django.urls import path
from .views import assignmentListAPIView

urlpatterns = [
    path('api/classroom/assignment/list/<str:class_name>/', assignmentListAPIView.as_view())
]
