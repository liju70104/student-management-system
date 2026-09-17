# 🎓 Student Management System

A full-stack web application for managing student records efficiently, built with a modern **React** frontend, a robust **Django REST Framework (DRF)** backend, and an **SQLite** database.

---

## 📌 Project Overview

The **Student Management System** is an educational administrative application designed to streamline student enrollment and record-keeping. It provides a real-time single-page dashboard where administrators, teachers, or coordinators can easily add, view, update, delete, and search student profiles across academic departments.

---

## ✨ Features

- **Real-Time Student Search**: Instant search across Student ID, Full Name, Register Number, Department, and Email.
- **Department Filtering**: Quick-filter dropdown to view students by specific departments.
- **Dynamic Stats & Counters**: Live summary chips showing total registered students and department count.
- **Modern Responsive UI**: Custom glassmorphism styling, vibrant color-coded badges, dark dashboard aesthetic, and mobile-friendly layouts.
- **Toast Feedback Alerts**: Instant success and error notifications for every database operation.
- **Pre-populated Sample Data**: Includes a Django management command to seed sample student records for immediate testing.

---

## 🔄 CRUD Operations

1. **Create (Add Student)**:
   - Form modal with real-time input validation for Student ID, Name, Register Number, Department, Email, and Phone.
2. **Read (View Students)**:
   - Responsive data table displaying student avatar initials, unique ID, registration number, color-coded department badge, and direct mail/call contact links.
3. **Update (Edit Student)**:
   - One-click edit dialog that populates existing student data for quick updating.
4. **Delete (Delete Student)**:
   - Safety confirmation modal displaying the student's name and registration number to prevent accidental deletion.
5. **Search & Filter**:
   - Integrated client-side and backend search queries (`/api/students/?search=...`).

---

## 💻 Technology Stack

### Frontend Details
- **Framework**: React 19 (SPA)
- **Tooling & Bundler**: Vite
- **Icons**: Lucide React
- **Typography**: Google Fonts (*Inter* and *Plus Jakarta Sans*)
- **Styling**: Vanilla CSS (Custom tokens, glassmorphism, responsive grid & flexbox, no heavy CSS dependencies)

### Backend Details
- **Framework**: Django 6
- **API Engine**: Django REST Framework (DRF)
- **CORS Handling**: `django-cors-headers`
- **Filtering**: `rest_framework.filters.SearchFilter`, `OrderingFilter`
- **Architecture**: RESTful architecture with Model-View-Serializer pattern

### Database Details
- **Database Engine**: SQLite (`db.sqlite3`)
- **ORM**: Django Object-Relational Mapper (ORM)
- **Indexes & Constraints**: Unique constraints on `student_id` and `register_number`

---

## 📂 Project Structure

```
student-management-system/
├── backend/
│   ├── core/                       # Django project settings & root URLs
│   │   ├── settings.py             # DRF, CORS, and installed apps config
│   │   ├── urls.py                 # API root routing
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── students/                   # Students Django app
│   │   ├── models.py               # Student model definition
│   │   ├── serializers.py          # DRF ModelSerializer & validators
│   │   ├── views.py                # StudentViewSet (CRUD, search, stats)
│   │   ├── urls.py                 # App URL router
│   │   ├── tests.py                # Comprehensive automated tests (9 tests)
│   │   └── management/
│   │       └── commands/
│   │           └── seed_students.py# Seed script for initial sample data
│   ├── requirements.txt            # Python dependencies
│   └── manage.py                   # Django CLI tool
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── studentService.js   # API client for backend communication
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with branding & stats
│   │   │   ├── StudentTable.jsx    # Table with search, badges, & actions
│   │   │   ├── StudentModal.jsx    # Add / Edit modal form
│   │   │   ├── DeleteConfirmModal.jsx # Delete confirmation dialog
│   │   │   └── Toast.jsx           # Success/error notifications
│   │   ├── App.jsx                 # Main state coordinator
│   │   ├── App.css                 # Component & layout styling
│   │   ├── index.css               # Global tokens, typography, glassmorphism
│   │   └── main.jsx                # React entry point
│   ├── index.html                  # HTML5 template with SEO meta
│   ├── package.json                # Node dependencies & scripts
│   └── vite.config.js              # Vite bundler configuration
├── run_backend.bat                 # Windows 1-click script to run backend
├── run_frontend.bat                # Windows 1-click script to run frontend
├── .gitignore                      # Git ignore rules for Django & React
└── README.md                       # Project documentation
```

---

## ⚙️ Installation Steps

### Prerequisites
- **Python** (3.10 or higher)
- **Node.js** (18 or higher) and **npm**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/liju70104/student-management-system.git
cd student-management-system
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# (Optional) Seed sample data
python manage.py seed_students
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install
```

---

## 🚀 How to Run

### Option 1: 1-Click Launch (Windows)
From the root directory:
1. Double-click `run_backend.bat`
2. Double-click `run_frontend.bat`
3. Open `http://localhost:5173/` in your web browser.

---

### Option 2: Run via Terminal

#### Terminal 1 - Backend Server:
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```
Backend API will run at: **`http://127.0.0.1:8000/api/students/`**

#### Terminal 2 - Frontend Server:
```bash
cd frontend
npm run dev
```
Frontend Web App will run at: **`http://localhost:5173/`**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/students/` | List all students |
| `GET` | `/api/students/?search=<query>` | Search across name, ID, register no, dept, email |
| `POST` | `/api/students/` | Register a new student |
| `GET` | `/api/students/<id>/` | Retrieve student details |
| `PUT` | `/api/students/<id>/` | Update student details |
| `PATCH` | `/api/students/<id>/` | Partial update student details |
| `DELETE` | `/api/students/<id>/` | Delete student record |
| `GET` | `/api/students/statistics/` | Quick stats (total count, department breakdown) |

---

## 🧪 Testing Information

The system includes automated tests and code quality checks for both backend and frontend:

### 1. Backend Automated Tests (Django / DRF)
The backend includes a comprehensive test suite in `backend/students/tests.py` verifying all CRUD endpoints, duplicate validations, statistics, and search features.

To run the automated backend tests:
```bash
cd backend
venv\Scripts\python manage.py test students
```

**Test Coverage:**
- Listing students (`GET /api/students/`)
- Creating a student (`POST /api/students/`)
- Retrieving single record (`GET /api/students/<id>/`)
- Full update (`PUT /api/students/<id>/`)
- Partial update (`PATCH /api/students/<id>/`)
- Deleting a record (`DELETE /api/students/<id>/`)
- Search keyword filtering (`?search=...`)
- Duplicate Student ID / Register Number rejection
- Department statistics endpoint calculation

### 2. Frontend Build & Quality Checks
```bash
cd frontend
# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## 🔮 Future Enhancements

- [ ] **Role-Based Authentication (JWT)**: Login roles for Administrators vs. Teachers vs. Students.
- [ ] **Student Profile Pictures**: Image upload support with AWS S3 / Cloudinary or local media storage.
- [ ] **Export to CSV / PDF**: Download student rosters and academic summary reports.
- [ ] **Attendance & Grading Modules**: Track course grades and daily classroom attendance.
- [ ] **Dark / Light Mode Toggle**: Customizable theme preference switcher.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
