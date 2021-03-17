from django.urls import path
from .views import BlogsAddAPIView, BlogsAPIView, BlogDestroyAPIView

urlpatterns = [
    path('api/add_blog/', BlogsAddAPIView.as_view()),
    path('api/blogs_list/', BlogsAPIView.as_view()),
    path('api/blogs/delete/<int:pk>/', BlogDestroyAPIView.as_view()),
]
