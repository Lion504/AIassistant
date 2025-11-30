Write-Host "Installing Backend (Python) Dependencies..." -ForegroundColor Cyan
pip install -r backend/requirements.txt

Write-Host "Installing Frontend (Node.js) Dependencies..." -ForegroundColor Cyan
cd frontend
npm install
cd ..

Write-Host "All dependencies installed successfully!" -ForegroundColor Green
