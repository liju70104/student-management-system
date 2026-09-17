from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Student

class StudentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.student_data = {
            "student_id": "STUTEST01",
            "name": "Jane Doe",
            "register_number": "REGTEST001",
            "department": "Computer Science",
            "email": "jane.doe@example.com",
            "phone": "+1 555-1234",
        }
        self.student = Student.objects.create(**self.student_data)

    def test_list_students(self):
        """Test retrieving list of students"""
        url = reverse('student-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) >= 1)
        self.assertEqual(response.data[0]['student_id'], self.student.student_id)

    def test_create_student(self):
        """Test creating a new student"""
        url = reverse('student-list')
        new_data = {
            "student_id": "STUTEST02",
            "name": "John Smith",
            "register_number": "REGTEST002",
            "department": "Mechanical Engineering",
            "email": "john.smith@example.com",
            "phone": "+1 555-5678",
        }
        response = self.client.post(url, new_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "John Smith")
        self.assertEqual(Student.objects.filter(student_id="STUTEST02").count(), 1)

    def test_retrieve_student(self):
        """Test retrieving a single student by id"""
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['student_id'], self.student.student_id)

    def test_update_student_put(self):
        """Test full update of a student"""
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        updated_data = {
            "student_id": "STUTEST01",
            "name": "Jane Updated",
            "register_number": "REGTEST001",
            "department": "Data Science",
            "email": "jane.updated@example.com",
            "phone": "+1 555-9999",
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Jane Updated")
        self.assertEqual(response.data['department'], "Data Science")

    def test_partial_update_student_patch(self):
        """Test partial update of a student"""
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        response = self.client.patch(url, {"department": "Artificial Intelligence"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['department'], "Artificial Intelligence")

    def test_delete_student(self):
        """Test deleting a student"""
        url = reverse('student-detail', kwargs={'pk': self.student.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Student.objects.filter(id=self.student.id).exists())

    def test_search_student(self):
        """Test searching students by keyword"""
        url = reverse('student-list') + '?search=Jane'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Jane Doe")

        # Search non-matching term
        url_none = reverse('student-list') + '?search=NonExistentKeyword'
        response_none = self.client.get(url_none)
        self.assertEqual(response_none.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_none.data), 0)

    def test_duplicate_student_id_validation(self):
        """Test that duplicate student_id is rejected"""
        url = reverse('student-list')
        duplicate_data = {
            "student_id": "STUTEST01",  # Same as existing
            "name": "Another Person",
            "register_number": "REGUNIQUE999",
            "department": "Civil",
            "email": "another@example.com",
            "phone": "12345",
        }
        response = self.client.post(url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('student_id', response.data)

    def test_statistics_endpoint(self):
        """Test statistics custom endpoint"""
        url = reverse('student-statistics')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_students', response.data)
        self.assertIn('departments', response.data)

    def test_login_success(self):
        """Test authentication with valid credentials"""
        url = reverse('login')
        response = self.client.post(url, {'username': 'admin', 'password': 'admin123'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('success'))
        self.assertIn('token', response.data)
        self.assertEqual(response.data['user']['username'], 'admin')

    def test_login_invalid_credentials(self):
        """Test authentication rejection with invalid credentials"""
        url = reverse('login')
        response = self.client.post(url, {'username': 'admin', 'password': 'wrongpassword'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data.get('success'))
        self.assertIn('detail', response.data)

    def test_login_missing_fields(self):
        """Test authentication rejection when fields are missing"""
        url = reverse('login')
        response = self.client.post(url, {'username': '', 'password': ''}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data.get('success'))
