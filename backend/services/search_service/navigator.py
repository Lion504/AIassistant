from services.llm_service import get_embedding
from .loader import load_navigation
from .embeddings import initialize_embeddings, TASK_EMBEDDINGS
from .math_utils import cosine_similarity
import string

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
