import json
import os
import random
from datetime import datetime, timedelta

DATA_DIR = os.path.join(os.path.dirname(__file__), "../backend/data")

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)
    return []

def save_json(filename, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Saved {len(data)} items to {filename}")

def generate_mock_announcements(count=100):
    titles = ["Maintenance", "Event", "Guest Lecture", "Course Change", "Cafeteria Menu", "IT Update", "Library News", "Student Union", "Sports", "Job Offer"]
    contents = ["Lorem ipsum dolor sit amet.", "Please note the following changes.", "Join us for a great event.", "Important update regarding your studies.", "Check out the new menu."]
    
    new_items = []
    for i in range(count):
        date = (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d")
        item = {
            "title": f"{random.choice(titles)} {i+1}: {random.choice(contents)}",
            "content": f"This is a mock announcement number {i+1}. {random.choice(contents)} {random.choice(contents)}",
            "date": date
        }
        new_items.append(item)
    return new_items

def generate_mock_navigation(count=100):
    actions = ["Find", "Check", "Book", "Contact", "View", "Download", "Register for", "Submit"]
    targets = ["Workspace", "Assignment", "Course", "Teacher", "Lunch", "Schedule", "Grade", "Thesis", "Application"]
    
    new_items = []
    for i in range(count):
        task = f"{random.choice(actions)} {random.choice(targets)} {i+1}"
        item = {
            "task": task,
            "url": f"https://oma.metropolia.fi/mock/url/{i+1}",
            "description": f"Mock description for {task}. This is a generated task."
        }
        new_items.append(item)
    return new_items

def generate_mock_electives(count=100):
    topics = ["AI", "Web", "Mobile", "Design", "Business", "Language", "Math", "Physics", "Health", "Security"]
    levels = ["Basics", "Advanced", "Intermediate", "Project", "Seminar"]
    
    new_items = []
    for i in range(count):
        topic = random.choice(topics)
        name = f"{random.choice(levels)} of {topic} {i+1}"
        item = {
            "name": name,
            "tags": [topic, "Mock", f"Tag{i}"],
            "description": f"Learn about {topic} in this mock course number {i+1}."
        }
        new_items.append(item)
    return new_items

if __name__ == "__main__":
    # Load existing
    announcements = load_json("announcements.json")
    navigation = load_json("navigation.json")
    electives = load_json("electives.json")
    
    # Generate new
    print("Generating 100 mock items for each category...")
    announcements.extend(generate_mock_announcements(100))
    navigation.extend(generate_mock_navigation(100))
    electives.extend(generate_mock_electives(100))
    
    # Save
    save_json("announcements.json", announcements)
    save_json("navigation.json", navigation)
    save_json("electives.json", electives)
