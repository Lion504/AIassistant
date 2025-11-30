from services.llm_service import generate_navigation_response

print("Testing Assignments Query...")
question = "What are my assignments?"
best_task = {
    "task": "Check assignments",
    "url": "https://oma.metropolia.fi/en/assignments",
    "description": "View your upcoming and past assignments.",
    "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
}

response = generate_navigation_response(question, best_task)

print(f"Question: {question}")
print(f"Answer: {response.get('answer')}")
print(f"Image: {response.get('image')}")

if "React Component Structure" in response.get("answer"):
    print("\nSUCCESS: Assignments list found in answer!")
else:
    print("\nFAILURE: Assignments list NOT found.")
