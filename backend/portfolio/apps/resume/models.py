from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=150, default="Tadese Mesfin")
    title = models.CharField(max_length=250, default="Full Stack Developer | AI Enthusiast | Data Science Aspirant")
    about = models.TextField(help_text="Professional introduction")
    profile_image = models.ImageField(upload_to='profile/', null=True, blank=True)
    profile_image_url = models.URLField(max_length=500, null=True, blank=True, help_text="Permanent photo URL (e.g. Cloudinary, Imgur, GitHub)")
    cv = models.FileField(upload_to='resumes/', null=True, blank=True)
    cv_url = models.URLField(max_length=500, null=True, blank=True, help_text="Permanent CV URL")
    email = models.EmailField(max_length=150, default="tadesemesfin@example.com")
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(max_length=150, blank=True)
    mission = models.TextField(blank=True, help_text="My Mission statement")
    vision = models.TextField(blank=True, help_text="My Vision statement")
    goals = models.TextField(blank=True, help_text="My Goals")
    achievements = models.TextField(blank=True, help_text="My Achievements list, comma or newline separated")

    def __str__(self):
        return self.name

class SocialLink(models.Model):
    platform = models.CharField(max_length=100)
    url = models.URLField(max_length=500)
    icon = models.CharField(max_length=100, help_text="React icon class/name, e.g. FaGithub, FaLinkedin, FaTelegramPlane")

    def __str__(self):
        return self.platform

class Education(models.Model):
    institution = models.CharField(max_length=250)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.degree} at {self.institution}"

class Experience(models.Model):
    company = models.CharField(max_length=250)
    position = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)
    current = models.BooleanField(default=False)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.position} at {self.company}"

class Certificate(models.Model):
    name = models.CharField(max_length=250)
    issuer = models.CharField(max_length=250)
    date = models.DateField()
    image = models.ImageField(upload_to='certificates/', null=True, blank=True)
    description = models.TextField(blank=True)
    url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.name} - {self.issuer}"

class Resume(models.Model):
    title = models.CharField(max_length=200, default="Tadese_Mesfin_CV")
    file = models.FileField(upload_to='resumes/')
    is_active = models.BooleanField(default=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.is_active:
            # Set all other Resumes to inactive
            Resume.objects.filter(is_active=True).exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} (Active: {self.is_active})"
