from services.search_service import find_best_task

queries = [
    "What is for lunch?",  # Keyword match
    "I'm hungry",  # Semantic match (no "lunch" keyword)
    "I want to learn coding",  # Semantic match for Programming course
    "I feel sick",  # Semantic match for Health
    "Where is the gym?",  # Semantic match for Sports
]

for q in queries:
    print(f"\nQuery: '{q}'")
    results = find_best_task(q)
    if results:
        print(f"  Top match: {results[0]['task']}")
        print(f"  Description: {results[0]['description']}")
    else:
        print("  No matches found.")
