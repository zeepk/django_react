from leads.models import (Lead, User, Entry)
from rest_framework import viewsets, permissions
from .serializers import (LeadSerializer, UserSerializer, EntrySerializer)


class LeadViewSet(viewsets.ModelViewSet):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
