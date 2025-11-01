from django.apps import AppConfig
from ultralytics import YOLO
import os
from django.conf import settings


class MlEngineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ml_engine'

    MODEL_PATH = os.path.join(settings.BASE_DIR, 'weights', 'best.pt')

    print(f"Loading custom YOLO model from {MODEL_PATH}")
    try:
        model = YOLO(MODEL_PATH)
        print("YOLO model loaded successfully")
    except Exception as e:
        print(f"Error loading YOLO model: {e}")
        model = None