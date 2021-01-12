from django.urls import path
from knox import views as knox_views
from .views import registerApiView, loginApiView, userApiView

urlpatterns = [
    path('api/auth/register/', registerApiView.as_view(), name='register'),
    path('api/auth/login/', loginApiView.as_view(), name='login'),
    path('api/auth/user/', userApiView.as_view(), name='user'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
]
