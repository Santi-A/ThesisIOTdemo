from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='index'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('getCurrentValue', views.getCurrentValue, name='getCurrentValue'),
]
