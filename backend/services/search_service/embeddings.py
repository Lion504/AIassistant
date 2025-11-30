from services.llm_service import get_embedding
from .loader import load_navigation

# Cache for embeddings
TASK_EMBEDDINGS = []


def initialize_embeddings():
    global TASK_EMBEDDINGS
    if TASK_EMBEDDINGS:
        return  # Already initialized

    print("Initializing semantic search embeddings...")
    nav_data = load_navigation()
    for item in nav_data:
        # Create a rich text representation for embedding
        text = f"{item['task']}: {item['description']}"
        embedding = get_embedding(text)
        if embedding:
            TASK_EMBEDDINGS.append({"item": item, "embedding": embedding})
    print(f"Initialized {len(TASK_EMBEDDINGS)} embeddings.")
