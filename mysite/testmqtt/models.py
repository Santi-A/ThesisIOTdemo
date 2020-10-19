from django.db import models


class ReceivedStrings(models.Model):
    string = models.CharField(default='', max_length=255)
