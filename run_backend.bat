@echo off
title Student Management System - Backend Server
echo ========================================================
echo Starting Django REST Framework Backend Server
echo Database: SQLite (db.sqlite3)
echo API URL:  http://127.0.0.1:8000/api/students/
echo ========================================================
cd /d "%~dp0backend"
call venv\Scripts\activate.bat
python manage.py runserver 127.0.0.1:8000
pause
