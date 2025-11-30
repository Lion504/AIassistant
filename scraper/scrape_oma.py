import requests
from bs4 import BeautifulSoup
import json
import os

# Configuration
BASE_URL = "https://oma.metropolia.fi"
DATA_DIR = os.path.join(os.path.dirname(__file__), "../backend/data")
os.makedirs(DATA_DIR, exist_ok=True)

def scrape_navigation():
    """
    Scrapes navigation links. 
    Since OMA requires login, we might need to mock this or use a public page if available.
    For MVP, we will start with a hardcoded list that mimics the structure.
    """
    print("Scraping navigation...")
    
    def get_image(task):
        task_lower = task.lower()
        if "lunch" in task_lower or "food" in task_lower:
            return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" # Food
        elif "workspace" in task_lower or "room" in task_lower:
            return "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" # Office
        elif "assignment" in task_lower or "course" in task_lower:
            return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" # Study
        elif "it" in task_lower or "software" in task_lower:
            return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" # Tech
        elif "health" in task_lower:
            return "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80" # Health
        elif "sport" in task_lower or "gym" in task_lower:
            return "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" # Gym
        else:
            return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" # Generic University

    # Generate 50+ mock navigation items
    nav_data = [
        {"task": "Find workspace", "url": "https://oma.metropolia.fi/en/workspaces", "description": "Search for available workspaces and meeting rooms."},
        {"task": "Check assignments", "url": "https://oma.metropolia.fi/en/assignments", "description": "View your upcoming and past assignments."},
        {"task": "Lunch menus", "url": "https://oma.metropolia.fi/en/lunch", "description": "See lunch menus for student cafeterias."},
        {"task": "IT Services", "url": "https://oma.metropolia.fi/en/it-services", "description": "Get help with IT issues, passwords, and software."},
        {"task": "Student Health", "url": "https://oma.metropolia.fi/en/student-health", "description": "Contact student health services."},
        {"task": "Tuudo", "url": "https://www.tuudo.fi/", "description": "Download the Tuudo app for schedule and student card."}
    ]
    
    # Add images to initial data
    for item in nav_data:
        item["image"] = get_image(item["task"])
    
    # Generate additional course workspaces
    for i in range(1, 31):
        task_name = f"Course: Advanced Programming {i}"
        nav_data.append({
            "task": task_name,
            "url": f"https://oma.metropolia.fi/en/course/AP{i}",
            "description": f"Workspace for Advanced Programming module {i}. Materials and submissions.",
            "image": get_image(task_name)
        })
        
    # Generate additional services
    services = ["Library", "Sports", "Housing", "Career Services", "International Office", "Student Union"]
    for service in services:
        task_name = f"{service} Info"
        nav_data.append({
            "task": task_name,
            "url": f"https://oma.metropolia.fi/en/{service.lower().replace(' ', '-')}",
            "description": f"Information and contacts for Metropolia {service}.",
            "image": get_image(task_name)
        })

    with open(os.path.join(DATA_DIR, "navigation.json"), "w") as f:
        json.dump(nav_data, f, indent=2)
    print(f"Saved {len(nav_data)} items to navigation.json")

def scrape_announcements():
    """
    Scrapes or mocks announcements.
    """
    print("Scraping announcements...")
    # Generate 50+ mock announcements
    announcements = []
    
    topics = ["Maintenance", "Event", "Course News", "Campus Update", "IT Alert"]
    
    for i in range(1, 61):
        topic = topics[i % len(topics)]
        announcements.append({
            "title": f"{topic}: Important Update #{i}",
            "content": f"This is a generated announcement about {topic}. Please pay attention to the details regarding item #{i}. Contact support if needed.",
            "date": f"2024-11-{10 + (i % 20):02d}"
        })

    with open(os.path.join(DATA_DIR, "announcements.json"), "w") as f:
        json.dump(announcements, f, indent=2)
    print(f"Saved {len(announcements)} items to announcements.json")

def scrape_electives():
    """
    Scrapes or mocks elective courses.
    """
    print("Scraping electives...")
    # Generate mock electives
    electives = [
        {"name": "Basics of AI", "tags": ["AI", "Computer Science"], "description": "Introduction to Artificial Intelligence concepts."},
        {"name": "Finnish for Beginners", "tags": ["Language", "Finnish"], "description": "Learn the basics of Finnish language."},
        {"name": "Web Development with React", "tags": ["Web Dev", "Frontend"], "description": "Deep dive into modern web development using React."},
        {"name": "Digital Marketing", "tags": ["Marketing", "Business"], "description": "Strategies for digital marketing and SEO."}
    ]
    
    # Add more electives
    for i in range(1, 21):
        electives.append({
            "name": f"Advanced Topic {i}",
            "tags": ["Advanced", "Technology"],
            "description": f"An advanced elective covering topic {i} in depth."
        })
        
    with open(os.path.join(DATA_DIR, "electives.json"), "w") as f:
        json.dump(electives, f, indent=2)
    print(f"Saved {len(electives)} items to electives.json")

def scrape_lunch():
    """
    Generates 4 weeks of fake lunch menus.
    """
    print("Generating lunch menus...")
    
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    main_dishes = ["Meatballs with mashed potatoes", "Salmon soup", "Chicken curry", "Vegetable lasagna", "Beef stew", "Fish and chips", "Pasta Carbonara", "Tofu stir-fry", "Pea soup and pancakes", "Pizza buffet"]
    vegan_dishes = ["Vegan Lentil Stew", "Chickpea Curry", "Tofu and Vegetable Wok", "Vegan Burger with Sweet Potato Fries", "Falafel with Hummus", "Vegan Bolognese", "Spinach and Tofu Curry", "Roasted Cauliflower Salad", "Vegan Chili Sin Carne", "Mushroom Risotto (Vegan)"]
    sides = ["Salad bar", "Rice", "Roasted vegetables", "Bread", "Fruit"]
    
    lunch_data = []
    
    import random
    
    for week in range(1, 5):
        for day in days:
            # Pick 2 random main dishes, 1 vegan dish, and 2 sides
            daily_mains = random.sample(main_dishes, 2)
            daily_vegan = random.sample(vegan_dishes, 1)
            daily_sides = random.sample(sides, 2)
            
            menu_items = daily_mains + daily_vegan + daily_sides
            
            lunch_data.append({
                "campus": "Myllypuro",
                "week": week,
                "day": day,
                "menu": menu_items,
                "url": "https://www.lounaat.info/lounas/metropolia-myllypuro/helsinki"
            })

    with open(os.path.join(DATA_DIR, "lunch.json"), "w") as f:
        json.dump(lunch_data, f, indent=2)
    print(f"Saved {len(lunch_data)} lunch menus to lunch.json")

if __name__ == "__main__":
    scrape_navigation()
    scrape_announcements()
    scrape_electives()
    scrape_lunch()
