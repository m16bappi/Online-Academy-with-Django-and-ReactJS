from django.urls import path

from .views import (classroomCreateAPIView, classroomListAPIView, classroomJoinAPIView, myClassroomAPIView,
                    classroomAPIView, teacherClassroomAPIView)

urlpatterns = [
    path('api/classroom/create/', classroomCreateAPIView.as_view(), name='classroom_create'),
    path('api/classroom/list/', classroomListAPIView.as_view(), name='classroom_list'),
    path('api/classroom/join/', classroomJoinAPIView.as_view(), name='classroom_join'),
    path('api/classroom/myclassroomlist/', myClassroomAPIView.as_view()),
    path('api/classroom/teacher/', teacherClassroomAPIView.as_view()),
    path('api/classroom/<int:id>/', classroomAPIView.as_view())
]
