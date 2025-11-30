import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from duckduckgo_search import DDGS

load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

api_key = os.getenv("GEMINI_API_KEY")
if api_key and api_key != "YOUR_API_KEY_HERE":
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-flash-latest")
else:
    model = None


# Load all data files
def load_json_data(filename):
    try:
        with open(
            os.path.join(os.path.dirname(__file__), f"../data/{filename}"), "r"
        ) as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filename}: {e}")
        return []


assignments_data = load_json_data("assignments.json")
lunch_data = load_json_data("lunch.json")
electives_data = load_json_data("electives.json")
teachers_data = load_json_data("teachers.json")
events_data = load_json_data("events.json")
locations_data = load_json_data("locations.json")


def search_internet(query):
    """
    Searches the internet for text and images using DuckDuckGo.
    """
    print(f"Searching internet for: {query}")
    try:
        results = DDGS().text(keywords=query, max_results=3)
        context = "\n".join([f"- {r['title']}: {r['body']}" for r in results])

        images = DDGS().images(keywords=query, max_results=1)
        image_url = images[0]["image"] if images else None

        return {"context": context, "image": image_url, "source": "Internet Search"}
    except Exception as e:
        print(f"Internet Search Error: {e}")
        return {"context": "", "image": None, "source": "Error"}


def get_embedding(text):
    """
    Generates an embedding for the given text using Gemini.
    """
    if not api_key:
        return None
    try:
        result = genai.embed_content(
            model="models/text-embedding-004", content=text, task_type="retrieval_query"
        )
        return result["embedding"]
    except Exception as e:
        print(f"Embedding Error: {e}")
        return None


def generate_navigation_response(user_query, best_task):
    """
    Generates a response for navigation using Gemini, with internet fallback and specific intent handling.
    """
    if not model:
        return {"answer": "AI not configured.", "image": None, "source": "Error"}

    # 1. Detect Intent & Inject Data
    context_data = ""
    query_lower = user_query.lower()

    # Assignments
    if any(
        k in query_lower for k in ["assignment", "homework", "task", "tehtävä", "läksy"]
    ):
        # Simple name detection (mock)
        student_name = "Alice"  # Default for demo
        if "bob" in query_lower:
            student_name = "Bob"

        user_assignments = [
            a
            for a in assignments_data
            if a.get("student_name", "").lower() == student_name.lower()
        ]
        context_data = (
            f"User's Assignments ({student_name}): {json.dumps(user_assignments)}"
        )

    # Lunch
    elif any(
        k in query_lower for k in ["lunch", "food", "menu", "ruoka", "lounas", "syödä"]
    ):
        import datetime

        today = datetime.datetime.now().strftime("%A")

        # Check if user specifically asked for "today"
        if "today" in query_lower or "tänään" in query_lower:
            todays_menu = [day for day in lunch_data if day["day"] == today]
            if todays_menu:
                context_data = (
                    f"Lunch Menu for Today ({today}): {json.dumps(todays_menu)}"
                )
            else:
                context_data = f"There is no lunch menu available for today ({today}). The cafeteria might be closed."
        else:
            # Show all if no specific day requested
            context_data = f"Lunch Menus: {json.dumps(lunch_data)}"

    # Events
    elif any(k in query_lower for k in ["event", "happening", "tapahtuma"]):
        context_data = f"Upcoming Events: {json.dumps(events_data)}"

    # Locations
    elif any(
        k in query_lower
        for k in ["where is", "location", "map", "missä", "sijainti", "kartta"]
    ):
        context_data = f"Campus Locations: {json.dumps(locations_data)}"

    # Teachers
    elif any(k in query_lower for k in ["teacher", "professor", "email", "opettaja"]):
        context_data = f"Teacher Directory: {json.dumps(teachers_data)}"

    # Electives
    elif any(k in query_lower for k in ["elective", "course", "kurssi", "valinnainen"]):
        context_data = f"Elective Courses: {json.dumps(electives_data)}"

    # Fallback to generic navigation context if no specific intent
    elif best_task:
        context_data = f"Navigation Context: {json.dumps(best_task)}"

    # 2. Construct System Prompt
    prompt = f"""
    You are an AI Assistant for Metropolia University of Applied Sciences.
    
    CRITICAL INSTRUCTION: DETECT THE LANGUAGE OF THE USER'S QUERY (English or Finnish).
    RESPOND IN THE SAME LANGUAGE AS THE USER.
    
    If the user asks in Finnish, TRANSLATE the provided data context into Finnish in your response.
    
    Context Data:
    {context_data}
    
    User Query: {user_query}
    
    Instructions:
    - Answer the user's question based ONLY on the Context Data provided above.
    - DETECT THE LANGUAGE (English or Finnish) and TRANSLATE the content accordingly.
    
    - **CRITICAL FOR LISTS (Lunch, Teachers, Events, Locations)**:
      If the user asks for a list of items, DO NOT use Markdown lists.
      Instead, output a **JSON ARRAY** wrapped in ```json``` code blocks.
      Each item in the array should have:
      - `title`: (string) The main name (e.g., Dish Name, Teacher Name).
      - `subtitle`: (string) Secondary info (e.g., "Vegetarian", Department).
      - `image`: (string) The image URL.
      - `details`: (string) Any extra info (e.g., Email, Location).
      
    - For simple text answers (not lists), just use plain text.
    
    Example JSON Output:
    ```json
    [
      {{ "title": "Meatballs", "subtitle": "Classic", "image": "url...", "details": "Gluten-free" }},
      {{ "title": "Dr. Smith", "subtitle": "IT Dept", "image": "url...", "details": "smith@example.com" }}
    ]
    ```
    """

    try:
        response = model.generate_content(prompt)
        response_text = response.text

        # Check if we need to fallback to internet search
        if "don't know" in response_text.lower() or "en tiedä" in response_text.lower():
            internet_result = search_internet(user_query)
            if internet_result["context"]:
                # Re-generate answer with internet context
                prompt_internet = f"""
                User Query: {user_query}
                Internet Search Results: {internet_result['context']}
                
                Answer the user's question based on the internet search results.
                Respond in the same language as the user.
                """
                response_internet = model.generate_content(prompt_internet)
                return {
                    "answer": response_internet.text,
                    "image": internet_result["image"],
                    "source": "Internet Search",
                }

        # Extract image from context if available (for the main UI image)
        image_url = None
        try:
            if context_data:
                # Try to parse the JSON part of the context string
                json_str = context_data.split(":", 1)[1].strip()
                data_list = json.loads(json_str)
                if isinstance(data_list, list) and len(data_list) > 0:
                    # Prefer image from the first item
                    if isinstance(data_list[0], dict):
                        image_url = data_list[0].get("image")
                    # Or from 'menu' items if it's lunch data
                    if "menu" in data_list[0] and isinstance(
                        data_list[0]["menu"], list
                    ):
                        image_url = data_list[0]["menu"][0].get("image")
        except:
            pass

        return {
            "answer": response_text,
            "image": image_url,
            "link": best_task.get("url") if best_task else None,
        }
    except Exception as e:
        print(f"Gemini Error: {e}")
        return {
            "answer": "Sorry, I'm having trouble thinking right now.",
            "image": None,
        }


def explain_announcement(text, language="en"):
    """
    Explains an announcement using Gemini.
    """
    if not model:
        return {"summary": "AI not configured.", "key_points": []}

    prompt = f"""
    Analyze the following announcement text for a student:
    "{text}"
    
    1. Provide a 1-sentence summary.
    2. Extract 3 key points (dates, actions, requirements).
    
    IMPORTANT: The summary and key points MUST be in the same language as the 'language' parameter provided: {language}.
    
    Output format: JSON with keys "summary" and "key_points" (list of strings).
    """

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text)
    except Exception as e:
        print(f"Gemini Error: {e}")
        return {"summary": "Error analyzing text.", "key_points": []}


def recommend_electives(interests, recommended_courses):
    """
    Generates a recommendation explanation using Gemini.
    """
    if not model:
        return "AI not configured."

    courses_text = "\n".join(
        [f"- {c['name']}: {c['description']}" for c in recommended_courses]
    )

    prompt = f"""
    User Interests: {interests}
    Recommended Courses:
    {courses_text}
    
    Write a short, encouraging paragraph explaining why these courses are a good fit for the user.
    IMPORTANT: Answer in the same language as the user's interests input.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"Gemini Error: {e}")
        return "Here are some courses that match your interests."
