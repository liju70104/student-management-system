from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from .models import Student
from .serializers import StudentSerializer

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
