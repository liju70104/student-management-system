from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id',
            'student_id',
            'name',
            'register_number',
            'department',
            'email',
            'phone',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Student name cannot be blank.")
        return value.strip()

    def validate_student_id(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Student ID cannot be blank.")
        return value.strip().upper()

    def validate_register_number(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Register number cannot be blank.")
        return value.strip().upper()

    def validate_phone(self, value):
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Phone number cannot be blank.")
        return cleaned
