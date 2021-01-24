from django.urls import path
from .views import programAPIView, intakeAPIView

urlpatterns = [
    path('api/program', programAPIView.as_view()),
    path('api/intake/<str:program>', intakeAPIView.as_view())
]
