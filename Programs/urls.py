from django.urls import path
from .views import programAPIView, intakeAPIView

urlpatterns = [
    path('api/program/', programAPIView.as_view()),
    path('api/intake/', intakeAPIView.as_view())
]
