from rest_framework import serializers
from .models import Project, Technology

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name']

class ProjectSerializer(serializers.ModelSerializer):
    technologies_details = TechnologySerializer(many=True, read_only=True, source='technologies')
    technologies = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Technology.objects.all(),
        required=False
    )
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'description', 'image', 'github_url', 
            'live_url', 'technologies', 'technologies_details', 'features', 'order', 'created_at'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Simplify frontend parsing by returning tech names list as 'technologies'
        data['technologies_names'] = [t.name for t in instance.technologies.all()]
        return data

    def create(self, validated_data):
        technologies = validated_data.pop('technologies', [])
        project = Project.objects.create(**validated_data)
        project.technologies.set(technologies)
        return project

    def update(self, instance, validated_data):
        technologies = validated_data.pop('technologies', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if technologies is not None:
            instance.technologies.set(technologies)
        return instance
