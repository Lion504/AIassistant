Write-Host "Starting OMA AI Assistant..." -ForegroundColor Green

# Start Backend
Write-Host "Launching Backend (Port 5000)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python backend/app.py"

# Start Frontend
Write-Host "Launching Frontend (Port 5173)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Both services are starting in new windows!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:5173"
