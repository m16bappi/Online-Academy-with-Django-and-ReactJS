from django.urls import path
from .views import courseListAPIView, courseAddAPIView

urlpatterns = [
    path('api/course/list', courseListAPIView.as_view(), name='course_list'),
    path('api/course/add', courseAddAPIView.as_view(), name='couser_add'),
]
