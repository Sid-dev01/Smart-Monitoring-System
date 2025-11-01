from rest_framework.decorators import api_view
from rest_framework.response import Response
import os

# def run_my_module(input_data):
#     prediction = input_data*2
#     return prediction

# @api_view(['POST'])
# def predict(request):
#     try:
#         data = request.data

#         user_number = data.get('number')

#         result = run_my_module(user_number)

#         return Response({'Prediction ': result})
    
#     except Exception as e:
#         return Response({'error': str(e)}, status=400)