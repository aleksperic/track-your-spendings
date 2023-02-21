import json
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Receipt
from .serializers import ReceiptSerializer, ReceiptScanSerializer
from .utils import extract_data_from_receipt


@api_view(['POST', 'GET'])
def scan_receipt_preview(request):
    qr_code: str = json.loads(request.body)['qrCode']
    data = extract_data_from_receipt(qr_code)
    if not data:
        return Response({'message': 'QR code not valid.'}, status=406)
    serializer = ReceiptScanSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def receipt_create_view(request):
    data = json.loads(request.body)
    serializer = ReceiptSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def receipt_list_view(request):
    user = request.user
    qs = Receipt.objects.filter(user=user)
    serializer = ReceiptScanSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
def receipt_detail_view(request, id):
    user = request.user
    qs = Receipt.objects.filter(user=user)
    qs = qs.filter(id=id)
    if not qs.exists():
        return Response({'message': 'Receipt does not exists'}, status=404)
    obj = qs.first()
    serializer = ReceiptSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(['DELETE', 'POST'])
def receipt_delete_view(request, id):
    user = request.user
    qs = Receipt.objects.filter(user=user)
    qs = qs.filter(id=id)
    if not qs.exists():
        return Response({'message': 'Receipt does not exists'}, status=404)
    obj = qs.first()
    obj.delete()
    return Response({'message': 'Receipt successfuly deleted!'}, status=200)
