Write-Host "Running Code Quality Checks..." -ForegroundColor Cyan

# Backend Checks
Write-Host "`n[Backend] Running Pylint..." -ForegroundColor Yellow
# Run pylint on backend directory, ignoring venv and migrations if any
python -m pylint backend --disable=C0111,C0103,C0413,W0703 --ignore=venv

# Frontend Checks
Write-Host "`n[Frontend] Running ESLint..." -ForegroundColor Yellow
cd frontend
npm run lint
cd ..

Write-Host "`nChecks Complete!" -ForegroundColor Green
