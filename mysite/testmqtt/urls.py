from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='index'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('threevisualization', views.threevisualization, name='threevisualization'),
    path('getCurrentValue', views.getCurrentValue, name='getCurrentValue'),
    path('csvexport', views.csvexport, name='csvexport'), 
    path('jsonexport', views.jsonexport, name='jsonexport')
]
