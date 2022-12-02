from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Receipt
from .serializers import ReceiptSerializer

from .utils import extract_data_from_receipt
# Create your views here.

def index(request, *args, **kwargs):    
    return render(request, 'index.html')

@api_view(['POST'])
def scan_receipt(request):
    if request.POST:
        data = extract_data_from_receipt(request.POST.get('unos'))
        print(data)

        
    serializer = ReceiptSerializer(data=data)  # type: ignore
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)