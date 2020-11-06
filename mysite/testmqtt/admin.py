from django.contrib import admin
from .models import ReceivedString, Node, Sensor, Point

# Register your models here.
admin.site.register(ReceivedString)
admin.site.register(Node)
admin.site.register(Sensor)
admin.site.register(Point)
