@echo off
echo ===========================================
echo       Avvio InstaScraper (Post)
echo ===========================================
echo.

echo Avvio del server Backend (Python/FastAPI)...
start "InstaScraper Backend" cmd /k "cd backend && .\venv\Scripts\activate && uvicorn main:app --host 127.0.0.1 --port 8000"

echo Avvio del server Frontend (Vite/React)...
start "InstaScraper Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Attendo qualche secondo che i server siano online...
timeout /t 5 >nul

echo.
echo Apro il browser all'indirizzo http://localhost:5173 
start http://localhost:5173

echo Ciao! L'app e' in esecuzione.
echo Per fermare tutto, chiudi semplicemente le finestre nere aperte.
