from services.llm_service import generate_navigation_response

print("Testing Internet Fallback...")
question = "Who is the president of Finland?"
best_task = None  # Simulate no local match

response = generate_navigation_response(question, best_task)

print(f"Question: {question}")
print(f"Answer: {response.get('answer')}")
print(f"Image: {response.get('image')}")
print(f"Source: {response.get('source')}")

if response.get("source") == "Internet Search" and response.get("image"):
    print("\nSUCCESS: Internet fallback worked!")
else:
    print("\nFAILURE: Internet fallback did not work as expected.")
