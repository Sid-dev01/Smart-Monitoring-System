from django.urls import path
from . import views

urlpatterns = [
    path('process-demo/', views.process_demo_video, name='process-demo-video')
]