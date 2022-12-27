from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Receipt
from .serializers import ReceiptSerializer
from .utils import extract_data_from_receipt


@api_view(['POST', 'GET'])
def scan_receipt_preview(request):
    data = extract_data_from_receipt(request.body.decode())
    if not data:
        return Response({'message': 'QR code not valid.'}, status=406)

    serializer = ReceiptSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)
    
@api_view(['POST'])
def receipt_create_view(request):
    serializer = ReceiptSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def receipt_list_view(request):
    print(request.user)
    user = request.user
    qs = Receipt.objects.filter(user=user)
    serializer = ReceiptSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def receipt_detail_view(request, id):
    user = request.user
    qs = Receipt.objects.filter(user=user).filter(id=id)
    if not qs.exists():
        return Response({'message': 'Receipt does not exists'}, status=404)
    obj = qs.first()
    serializer = ReceiptSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
def receipt_delete_view(request, id):
    user = request.user
    qs = Receipt.objects.filter(user=user).filter(id=id)
    if not qs.exists():
        return Response({'message': 'Receipt does not exists'}, status=404)
    obj = qs.first()
    obj.delete()
    return Response({'message': 'Receipt successfuly deleted!'}, status=200)