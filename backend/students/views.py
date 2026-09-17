from rest_framework import viewsets, filters, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Count
from .models import Student
from .serializers import StudentSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Simple authentication endpoint for administrative access.
    Accepts: { username, password }
    Demo Credentials: admin / admin123
    """
    username = str(request.data.get('username', '')).strip()
    password = str(request.data.get('password', '')).strip()

    if not username or not password:
        return Response({
            'success': False,
            'detail': 'Please enter both username and password.'
        }, status=status.HTTP_400_BAD_REQUEST)

    if username == 'admin' and password == 'admin123':
        return Response({
            'success': True,
            'message': 'Login successful.',
            'user': {
                'username': 'admin',
                'name': 'Administrator',
                'role': 'Admin'
            },
            'token': 'auth-token-admin'
        }, status=status.HTTP_200_OK)

    return Response({
        'success': False,
        'detail': 'Invalid username or password. Please check your credentials.'
    }, status=status.HTTP_401_UNAUTHORIZED)


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows students to be viewed, created, updated, deleted, and searched.
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [
        'name',
        'student_id',
        'register_number',
        'department',
        'email',
        'phone',
    ]
    ordering_fields = [
        'created_at',
        'name',
        'student_id',
        'register_number',
        'department',
    ]
    ordering = ['-created_at']

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """
        Returns quick statistics: total students count and breakdown by department.
        """
        total_students = self.get_queryset().count()
        dept_counts = (
            self.get_queryset()
            .values('department')
            .annotate(count=Count('id'))
            .order_by('-count')
        )
        return Response({
            'total_students': total_students,
            'departments': dept_counts,
        }, status=status.HTTP_200_OK)
