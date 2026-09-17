# 🎓 Student Management System

A full-stack web application for managing student records efficiently, built with a modern **React** frontend, a robust **Django REST Framework (DRF)** backend, and an **SQLite** database.

---

## 📌 Project Overview

The **Student Management System** is an educational administrative application designed to streamline student enrollment and record-keeping. It provides a real-time single-page dashboard where administrators, teachers, or coordinators can easily add, view, update, delete, and search student profiles across academic departments.

---

## ✨ Features

- **Administrative Login Gate**: Secure authentication screen with credential validation, password visibility toggle, session persistence, and logout.
- **Real-Time Student Search**: Instant search across Student ID, Full Name, Register Number, Department, and Email.
- **Department Filtering**: Quick-filter dropdown to view students by specific departments.
- **Dynamic Stats & Counters**: Live summary chips showing total registered students and department count.
- **Modern Responsive UI**: Custom glassmorphism styling, vibrant color-coded badges, dark dashboard aesthetic, and mobile-friendly layouts.
- **Toast Feedback Alerts**: Instant success and error notifications for every database operation.
- **Pre-populated Sample Data**: Includes a Django management command to seed sample student records for immediate testing.

---

## 🔐 Authentication & Demo Credentials

Access to the Student Management Dashboard is protected by a login screen. Unauthenticated visitors are automatically directed to sign in.

| Field | Demo Credential |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123` |

### Key Authentication Features:
- **Protected Routing**: Unauthenticated sessions cannot view the student directory.
- **Session Persistence**: Maintains login state across page navigation and browser reloads via `localStorage`.
- **One-Click Demo Autofill**: Convenient button on the login card to test access instantly.
- **Secure Logout**: Easily sign out from the navigation bar, clearing all credentials.

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
| `POST` | `/api/login/` | Authenticate administrator credentials (`admin` / `admin123`) |
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
The backend includes a comprehensive test suite in `backend/students/tests.py` verifying all CRUD endpoints, duplicate validations, statistics, search features, and authentication.

To run the automated backend tests:
```bash
cd backend
venv\Scripts\python manage.py test students
```

**Test Coverage (12 tests):**
- Authentication with valid credentials (`POST /api/login/`)
- Authentication rejection on invalid credentials
- Authentication rejection on missing fields
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

## 🚀 Deployment Guide (Vercel & Render)

This application is architected for decoupled cloud deployment:
- **Frontend** → **Vercel**
- **Backend** → **Render**

### 1. Backend Deployment on Render

1. **Push your code** to GitHub.
2. Sign in to [Render](https://render.com/) and click **New +** -> **Web Service** (or use Blueprint via `render.yaml`).
3. Connect your repository `student-management-system`.
4. Configure service settings:
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn core.wsgi:application`
5. Configure Environment Variables:
   - `PYTHON_VERSION`: `3.12.8`
   - `DJANGO_DEBUG`: `False`
   - `DJANGO_SECRET_KEY`: `<Generate a secure random string>`
   - `CORS_ALLOWED_ORIGINS`: `https://<your-frontend>.vercel.app`
   - `CORS_ALLOW_ALL_ORIGINS`: `False`
   - *(Optional PostgreSQL)* `DATABASE_URL`: Add a Render PostgreSQL database and link its Internal Database URL. If omitted, Django automatically uses SQLite.
6. Click **Deploy**. Note your live Render backend URL: e.g. `https://student-backend.onrender.com`.

### 2. Frontend Deployment on Vercel

1. Sign in to [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
2. Import your GitHub repository `student-management-system`.
3. In the project configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: Click edit and select `frontend`
4. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<your-backend>.onrender.com` (Your live Render backend URL without trailing slash)
5. Click **Deploy**.
6. Once deployed, copy your Vercel domain (e.g. `https://student-sms.vercel.app`) and ensure it is listed in your Render backend `CORS_ALLOWED_ORIGINS`.

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
