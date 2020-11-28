from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='index'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('canvas', views.canvas, name='canvas'),
    path('threevisualization', views.threevisualization, name='threevisualization'),
    path('getCurrentValue', views.getCurrentValue, name='getCurrentValue'),
    path('updateCanvas', views.updateCanvas, name='updateCanvas'),
    path('updateCanvasPoints', views.updateCanvasPoints, name='updateCanvasPoints'),
]
