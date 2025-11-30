from .loader import load_electives


def find_electives(interests):
    """
    Finds electives based on interests.
    """
    electives = load_electives()
    interests_lower = interests.lower()
    matches = []

    for course in electives:
        score = 0
        if any(tag.lower() in interests_lower for tag in course["tags"]):
            score += 5
        if interests_lower in course["description"].lower():
            score += 2

        if score > 0:
            matches.append((score, course))

    matches.sort(key=lambda x: x[0], reverse=True)
    return [m[1] for m in matches[:5]]
