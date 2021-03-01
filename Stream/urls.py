from django.urls import path

from .views import StreamListAPIView, CommentListAPIView, createStreamAPIView, createCommentAPIView

urlpatterns = [
    path('api/classroom/stream/create/', createStreamAPIView.as_view()),
    path('api/classroom/stream/list/<int:id>/', StreamListAPIView.as_view()),
    path('api/classroom/stream/comment/create/', createCommentAPIView.as_view()),
    path('api/classroom/stream/comment/list/<int:id>/', CommentListAPIView.as_view())
]
