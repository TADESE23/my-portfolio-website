from django.contrib import admin
from .models import Profile, SocialLink, Education, Experience, Certificate, Resume

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'title', 'email')
    search_fields = ('name', 'title')

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('id', 'platform', 'url')
    search_fields = ('platform',)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('id', 'institution', 'degree', 'field_of_study', 'start_date', 'current')
    list_filter = ('current',)
    search_fields = ('institution', 'degree', 'field_of_study')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'position', 'start_date', 'current')
    list_filter = ('current',)
    search_fields = ('company', 'position')

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'issuer', 'date')
    search_fields = ('name', 'issuer')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'is_active', 'uploaded_at')
    list_filter = ('is_active',)
    search_fields = ('title',)
