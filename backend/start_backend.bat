@echo off
echo ==========================================
echo Starting VERITAS Backend...
echo ==========================================
cd /d "%~dp0"
call .\venv\Scripts\activate
python main.py
pause
