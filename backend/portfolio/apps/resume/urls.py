from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProfileViewSet, SocialLinkViewSet, EducationViewSet, 
    ExperienceViewSet, CertificateViewSet, ResumeViewSet
)

router = DefaultRouter()
router.register('profile', ProfileViewSet, basename='profile')
router.register('sociallinks', SocialLinkViewSet, basename='sociallink')
router.register('education', EducationViewSet, basename='education')
router.register('experience', ExperienceViewSet, basename='experience')
router.register('certificates', CertificateViewSet, basename='certificate')
router.register('resumes', ResumeViewSet, basename='resume')

urlpatterns = [
    path('', include(router.urls)),
]
