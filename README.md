# OMA AI Assistant

## 🚀 Overview
This is a smart, bilingual AI assistant designed for Metropolia University students and staff. Using natural language, it helps users find campus information, lunch menus, assignments and elective courses, among other things.

## ✨ Key Features
- **🧠 AI-Powered Navigation**: Ask questions naturally in English or Finnish.
    - **🍽️ Visual Lunch Menus**: Shows daily menus with food images in a professional card layout.
    - **📅 Event & Location Finder**: Finds campus events and navigates you to classrooms with map previews and addresses.
    - **📝 Assignment Finder**: Finds and check for you with your assignments status and deadlines.
    - **📚 Teacher Finder**: Finds all your teacher information based on your studies.
- **📢 Announcement translate and summary**: ananlysis announcements from university and translate and summrize them for you.
- **🎓 Elective Recommendations**: Suggests elective courses based on your studies or interests.
- **📊 Teacher Dashboard**: Interactive insights graph showing trending student questions.
- **🌍 Bilingual Support**: Automatically detects language and translates content (e.g., translates Finnish lunch menus to English).
## 🛠️ Tech Stack
- **Frontend**: React, Vite, Recharts, React Markdown
- **Backend**: Python, Flask
- **AI/LLM**: Google Gemini API (Embeddings & Text Generation)
- **Search**: Hybrid Search (Cosine Similarity + Keyword Matching)
- **External Tools**: DuckDuckGo Search (Internet Fallback)

## ⚙️ How It Works
1.  **Intent Detection**: The AI analyzes your query to see if you want Lunch, Assignments, or General Info.
2.  **Hybrid Search**: It searches local data (JSON) using both keywords and semantic meaning (Embeddings).
3.  **RAG (Retrieval Augmented Generation)**: Relevant data is injected into the AI's context.
4.  **Generation**: Google Gemini generates a natural, formatted response (JSON for lists, Markdown for text).

## 🚀 How to Run

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Installation
Run the unified setup script to install dependencies for both Backend and Frontend:
```powershell
./setup.ps1
```

### 2. Start the App
Launch both the Backend and Frontend servers with one command:
```powershell
./start.ps1
```
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📂 Project Structure
- `backend/`: Flask server, AI logic, and JSON data.
- `frontend/`: React application and UI components.
- `scraper/`: Scripts to generate mock data.

---
*Created by Lion504*
