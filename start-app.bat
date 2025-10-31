@echo off
echo Starting VibeShare Application...
echo.
echo Starting Backend Server...
start cmd /k "cd /d "%~dp0backend" && npm start"
timeout /t 3 /nobreak > nul
echo.
echo Starting Frontend Server...
start cmd /k "cd /d "%~dp0frontend" && npm run dev"
echo.
echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window (servers will continue running)
pause > nul
