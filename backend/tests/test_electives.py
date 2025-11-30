import json
import os

file_path = os.path.join(os.path.dirname(__file__), "data/electives.json")

print(f"Checking {file_path}...")

try:
    with open(file_path, "r") as f:
        data = json.load(f)

    print(f"Successfully loaded {len(data)} electives.")

    expected_courses = [
        "Cloud Computing Platforms",
        "Cyber Security Fundamentals",
        "Game Design & Unity",
    ]
    found_count = 0

    for course in data:
        if course["name"] in expected_courses:
            print(f"Found expected course: {course['name']}")
            found_count += 1

    if found_count == len(expected_courses):
        print("\nSUCCESS: All expected sample courses found.")
    else:
        print(
            f"\nWARNING: Found {found_count}/{len(expected_courses)} expected courses."
        )

except Exception as e:
    print(f"\nFAILURE: Error reading file: {e}")
