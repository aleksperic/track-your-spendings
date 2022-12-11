from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes
    )
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Receipt
from .serializers import ReceiptSerializer
from .utils import extract_data_from_receipt


def index(request, *args, **kwargs):    
    return render(request, 'index.html')

@api_view(['POST', 'GET'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([IsAuthenticated])
def scan_receipt_preview(request, *args, **kwargs):
    # print(request.body.decode())
    # print('-'*100)
    # data = extract_data_from_receipt(request.POST.get('unos'))
    data = extract_data_from_receipt(request.body.decode())
    serializer = ReceiptSerializer(data=data)  # type: ignore
    if serializer.is_valid(raise_exception=True):
        # serializer.save(user=request.user)
        return Response(serializer.data, status=200)
    return Response({}, status=400)

@api_view(['POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def receipt_create_view(request):
    serializer = ReceiptSerializer(data=request.POST)  # type: ignore
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def receipt_list_view(request):
    qs = Receipt.objects.all()
    serializer = ReceiptSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def receipt_detail_view(request, id):
    qs = Receipt.objects.filter(id=id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = ReceiptSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def receipt_delete_view(request, id):
    qs = Receipt.objects.filter(id=id)
    if not qs.exists():
        return Response({'message': 'Receipt does not exists'}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message': 'You are not allowed to delete this tweet'}, status=401)
    obj = qs.first()
    obj.delete() #type: ignore
    return Response({'message': 'Receipt successfuly deleted!'}, status=200)