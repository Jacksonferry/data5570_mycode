from django.db import models
from django.conf import settings


class Location(models.Model):
    name = models.CharField(max_length=150)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6
    )
    category = models.CharField(max_length=100)
    google_place_id = models.CharField(
        max_length=255,
        unique=True
    )
    estimated_capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name


class CrowdReport(models.Model):
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="crowd_reports"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="crowd_reports"
    )
    crowd_rating = models.PositiveSmallIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.location) + " - " + str(self.crowd_rating)


class Event(models.Model):
    location = models.ForeignKey(
        Location,
        on_delete=models.CASCADE,
        related_name="events"
    )
    event_name = models.CharField(max_length=150)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField(blank=True)

    def __str__(self):
        return self.event_name
# Create your models here.
