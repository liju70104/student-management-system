@echo off
title Student Management System - Frontend Dev Server
echo ========================================================
echo Starting React Vite Frontend Server
echo URL: http://localhost:5173/
echo ========================================================
cd /d "%~dp0frontend"
npm run dev
pause
