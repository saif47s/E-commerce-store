@echo off
cd /d "%~dp0"
echo Checking port 8000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
  echo Killing process on port 8000: %%a
  taskkill /PID %%a /F 2>nul
  timeout /t 2 /nobreak >nul
)
echo.
echo Starting Storefront on http://localhost:8000
echo Keep this window open. Press Ctrl+C to stop.
echo.
call npm run dev
pause
