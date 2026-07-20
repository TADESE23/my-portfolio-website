from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, CategoryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('', BlogViewSet, basename='blog')

urlpatterns = [
    path('', include(router.urls)),
]
