from django.shortcuts import render

# Create your views here.
from restframework.decorators import api_view
from restframework.response import Response
from rest_framework import status
import threading
from .tasks import process_video_task


@api_view(['POST'])
def process_demo_video(request):

    try:
        if any(t.name=='video_processing_thread' for t in threading.enumerate()):
            return Response(
                {"status": "processing", "message": "A task is already running"},
                status = status.HTTP_202_ACCEPTED
            )
        
        print("Starting video processing task...")
        thread = threading.Thread(target=process_video_task, name="video_processing_thread")
        thread.start()

        return Response(
            {"status": "started", "message": "Video processing task started"},
            status = status.HTTP_202_ACCEPTED
        )
    except Exception as e:
        return Response(
            {"status": "error", "message": str(e)},
            status = status.HTTP_500_INTERNAL_SERVER_ERROR
        )