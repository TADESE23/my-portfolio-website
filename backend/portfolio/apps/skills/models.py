from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('ai', 'AI'),
        ('programming', 'Programming Languages'),
        ('tools', 'Tools'),
    ]

    name = models.CharField(max_length=100)
    percentage = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Skill competency level out of 100"
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50, blank=True, help_text="React Icon name, e.g., FaReact, SiDjango, SiTypescript")

    class Meta:
        ordering = ['category', '-percentage', 'name']

    def __str__(self):
        return f"{self.name} ({self.category} - {self.percentage}%)"
