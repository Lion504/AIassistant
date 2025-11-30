Write-Host "Formatting Code..." -ForegroundColor Cyan

# Backend Format
Write-Host "`n[Backend] Running Black..." -ForegroundColor Yellow
python -m black backend

# Frontend Format
Write-Host "`n[Frontend] Running Prettier..." -ForegroundColor Yellow
cd frontend
npx prettier --write "src/**/*.{js,jsx,css}"
cd ..

Write-Host "`nFormatting Complete!" -ForegroundColor Green
