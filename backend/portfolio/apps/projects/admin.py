from django.contrib import admin
from .models import Project, Technology

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'order', 'created_at')
    list_filter = ('technologies',)
    search_fields = ('name', 'description')
    ordering = ('order', '-created_at')
