import json
import os
from difflib import get_close_matches

DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")

def load_navigation():
    try:
        with open(os.path.join(DATA_DIR, "navigation.json"), "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def load_electives():
    try:
        with open(os.path.join(DATA_DIR, "electives.json"), "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

from services.llm_service import get_embedding
import math

# Cache for embeddings
TASK_EMBEDDINGS = []

def cosine_similarity(v1, v2):
    "Compute cosine similarity between two vectors."
    if not v1 or not v2: return 0.0
    dot_product = sum(a*b for a,b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a*a for a in v1))
    norm_v2 = math.sqrt(sum(b*b for b in v2))
    return dot_product / (norm_v1 * norm_v2) if norm_v1 > 0 and norm_v2 > 0 else 0.0

def initialize_embeddings():
    global TASK_EMBEDDINGS
    if TASK_EMBEDDINGS: return # Already initialized
    
    print("Initializing semantic search embeddings...")
    nav_data = load_navigation()
    for item in nav_data:
        # Create a rich text representation for embedding
        text = f"{item['task']}: {item['description']}"
        embedding = get_embedding(text)
        if embedding:
            TASK_EMBEDDINGS.append({
                "item": item,
                "embedding": embedding
            })
    print(f"Initialized {len(TASK_EMBEDDINGS)} embeddings.")

def find_best_task(query):
    """
    Finds the best matching task using Hybrid Search (Keyword + Semantic).
    """
    # Ensure embeddings are loaded (lazy load)
    if not TASK_EMBEDDINGS:
        initialize_embeddings()
        
    # 1. Semantic Search
    query_embedding = get_embedding(query)
    semantic_matches = []
    
    if query_embedding:
        for entry in TASK_EMBEDDINGS:
            score = cosine_similarity(query_embedding, entry['embedding'])
            if score > 0.3: # Threshold for relevance
                semantic_matches.append((score * 10, entry['item'])) # Scale score to match keyword scale
    
    # 2. Keyword Search (Legacy)
    import string
    query_lower = query.lower().translate(str.maketrans('', '', string.punctuation))
    query_words = set(query_lower.split())
    
    keyword_matches = []
    nav_data = load_navigation() # Reload in case of updates, though embeddings might be stale if file changes
    
    for item in nav_data:
        score = 0
        item_task_lower = item['task'].lower()
        
        # Exact phrase match
        if query_lower in item_task_lower:
            score += 10
        elif item_task_lower in query_lower:
            score += 5
            
        # Keyword match
        task_words = set(item_task_lower.split())
        common_words = query_words.intersection(task_words)
        score += len(common_words) * 2
        
        if score > 0:
            keyword_matches.append((score, item))
            
    # 3. Combine Results
    # We'll use a dict to deduplicate by task name
    combined_results = {}
    
    for score, item in semantic_matches:
        combined_results[item['task']] = {"score": score, "item": item}
        
    for score, item in keyword_matches:
        if item['task'] in combined_results:
            combined_results[item['task']]["score"] += score # Boost if both match
        else:
            combined_results[item['task']] = {"score": score, "item": item}
            
    # Convert back to list and sort
    final_matches = list(combined_results.values())
    final_matches.sort(key=lambda x: x['score'], reverse=True)
    
    return [m['item'] for m in final_matches[:3]]

def find_electives(interests):
    """
    Finds electives based on interests.
    """
    electives = load_electives()
    interests_lower = interests.lower()
    matches = []
    
    for course in electives:
        score = 0
        if any(tag.lower() in interests_lower for tag in course['tags']):
            score += 5
        if interests_lower in course['description'].lower():
            score += 2
            
        if score > 0:
            matches.append((score, course))
            
    matches.sort(key=lambda x: x[0], reverse=True)
    return [m[1] for m in matches[:5]]
