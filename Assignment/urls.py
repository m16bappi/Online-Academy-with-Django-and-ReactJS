from django.urls import path
from .views import assignmentListAPIView, assignmentParticipantAPIView, assignmentParticipantListAPIView

urlpatterns = [
    path('api/classroom/assignment/list/<int:id>/', assignmentListAPIView.as_view()),
    path('api/classroom/assignment/participant/', assignmentParticipantAPIView.as_view()),
    path('api/classroom/assignment/participant/list/<int:id>/', assignmentParticipantListAPIView.as_view())
]
