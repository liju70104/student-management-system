from django.db import models

class Student(models.Model):
    student_id = models.CharField(max_length=50, unique=True, help_text="Unique Student ID (e.g., STU001)")
    name = models.CharField(max_length=120, help_text="Student's full name")
    register_number = models.CharField(max_length=50, unique=True, help_text="Official Register / Roll Number")
    department = models.CharField(max_length=100, help_text="Academic Department (e.g., Computer Science)")
    email = models.EmailField(max_length=150, help_text="Valid email address")
    phone = models.CharField(max_length=25, help_text="Contact phone number")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return f"{self.name} ({self.student_id})"
