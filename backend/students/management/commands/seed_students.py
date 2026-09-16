from django.core.management.base import BaseCommand
from students.models import Student

class Command(BaseCommand):
    help = 'Seeds initial sample student records'

    def handle(self, *args, **options):
        sample_students = [
            {
                "student_id": "STU101",
                "name": "Aarav Sharma",
                "register_number": "REG2024001",
                "department": "Computer Science",
                "email": "aarav.sharma@example.com",
                "phone": "+91 98765 43210",
            },
            {
                "student_id": "STU102",
                "name": "Ananya Patel",
                "register_number": "REG2024002",
                "department": "Information Technology",
                "email": "ananya.patel@example.com",
                "phone": "+91 98765 43211",
            },
            {
                "student_id": "STU103",
                "name": "Rohan Verma",
                "register_number": "REG2024003",
                "department": "Mechanical Engineering",
                "email": "rohan.verma@example.com",
                "phone": "+91 98765 43212",
            },
            {
                "student_id": "STU104",
                "name": "Sneha Nair",
                "register_number": "REG2024004",
                "department": "Electronics & Communication",
                "email": "sneha.nair@example.com",
                "phone": "+91 98765 43213",
            },
            {
                "student_id": "STU105",
                "name": "Vikram Rao",
                "register_number": "REG2024005",
                "department": "Civil Engineering",
                "email": "vikram.rao@example.com",
                "phone": "+91 98765 43214",
            },
        ]

        created_count = 0
        for data in sample_students:
            student, created = Student.objects.get_or_create(
                student_id=data["student_id"],
                defaults=data
            )
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Successfully seeded {created_count} new students (Total: {Student.objects.count()})."))
