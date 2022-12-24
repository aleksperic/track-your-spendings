from django.contrib.auth import login, logout

from knox.models import AuthToken
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .serializers import RegisterSerializer, UserSerializer


class RegisterAPIView(GenericAPIView):
    serializer_class=RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        print('HQQQ')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })
    

class LoginAPIView(GenericAPIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            login(request, user)
            print(request.user)
            return super(LoginAPIView, self).post(request, format=None)
        return Response(serializer.errors, status=400)

class LogoutAPIView(GenericAPIView):
    pass

