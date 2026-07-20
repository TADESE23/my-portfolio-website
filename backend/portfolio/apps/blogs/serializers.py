from rest_framework import serializers
from .models import Blog, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class BlogSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(many=False, read_only=True, source='category')
    category = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Category.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'slug', 'content', 'image', 
            'category', 'category_details', 'created_at', 'updated_at', 'views', 'is_published'
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Simplify displaying category name directly
        if instance.category:
            data['category_name'] = instance.category.name
        else:
            data['category_name'] = None
        return data
