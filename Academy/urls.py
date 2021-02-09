from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('Blog.urls')),
    path('', include('Users.urls')),
    path('', include('Course.urls')),
    path('', include('Classroom.urls')),
    path('', include('Programs.urls')),
    path('', include('Exam.urls')),
    path('', include('Assignment.urls')),
    path('', include('Stream.urls')),
    url(r'^api-auth/', include('rest_framework.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
