from rest_framework import viewsets, permissions
from django.core.mail import send_mail
from django.conf import settings
from .models import Message
from .serializers import MessageSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        message_instance = serializer.save()
        
        # Send Email Notification
        subject = f"Portfolio Contact Form: {message_instance.subject}"
        body = (
            f"You have received a new message from your portfolio website contact form.\n\n"
            f"Name: {message_instance.name}\n"
            f"Email: {message_instance.email}\n\n"
            f"Subject: {message_instance.subject}\n\n"
            f"Message:\n{message_instance.message}\n"
        )
        recipient = getattr(settings, 'NOTIFICATION_EMAIL', None)
        if recipient:
            try:
                send_mail(
                    subject,
                    body,
                    settings.DEFAULT_FROM_EMAIL,
                    [recipient],
                    fail_silently=True,
                )
            except Exception:
                pass
