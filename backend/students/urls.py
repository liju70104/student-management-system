from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, login_view

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')

urlpatterns = [
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
]
