import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def test_health():
    print("\nTesting /health...")
    try:
        response = requests.get("http://127.0.0.1:5000/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

def test_navigate():
    print("\nTesting /navigate...")
    try:
        response = requests.post(f"{BASE_URL}/navigate", json={"question": "Where can I find lunch?"})
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Response Text: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

def test_explain():
    print("\nTesting /explain...")
    text = """
    Attention Students!
    The library will be closed for renovation from Dec 1st to Dec 15th.
    Please return all books by Nov 30th.
    Study spaces are available in the B-wing.
    """
    try:
        response = requests.post(f"{BASE_URL}/explain", json={"text": text})
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
        else:
            print(f"Response Text: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_health()
    test_navigate()
    test_explain()
    
    print("\nTesting /navigate (Lunch)...")
    try:
        response = requests.post(f"{BASE_URL}/navigate", json={"question": "What is for lunch?"})
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")
