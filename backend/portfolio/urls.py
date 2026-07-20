from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Apps routing
    path('api/auth/', include('portfolio.apps.authentication.urls')),
    path('api/projects/', include('portfolio.apps.projects.urls')),
    path('api/blogs/', include('portfolio.apps.blogs.urls')),
    path('api/skills/', include('portfolio.apps.skills.urls')),
    path('api/resume/', include('portfolio.apps.resume.urls')),
    path('api/contact/', include('portfolio.apps.contact.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
