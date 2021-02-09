from django.urls import path

from .views import StreamListAPIView, CommentListAPIView
urlpatterns = [
    path('api/classroom/stream/list/<int:id>/', StreamListAPIView.as_view()),
    path('api/classroom/stream/comment/list/<int:id>/', CommentListAPIView.as_view())
]
