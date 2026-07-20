from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TechnologyViewSet

router = DefaultRouter()
router.register('technologies', TechnologyViewSet, basename='technology')
router.register('', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]
