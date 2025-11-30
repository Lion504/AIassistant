import json
import os
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

DATA_DIR = os.path.join(os.path.dirname(__file__), "../data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
SECRET_KEY = os.getenv("SECRET_KEY", "dev_secret_key_123") # In prod, this should be a real secret

def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

def register_user(username, password, role="student"):
    users = load_users()
    
    if any(u['username'] == username for u in users):
        return {"error": "Username already exists"}
    
    new_user = {
        "username": username,
        "password": generate_password_hash(password),
        "role": role
    }
    
    users.append(new_user)
    save_users(users)
    
    return {"message": "User registered successfully"}

def authenticate_user(username, password):
    users = load_users()
    user = next((u for u in users if u['username'] == username), None)
    
    if user and check_password_hash(user['password'], password):
        token = jwt.encode({
            "username": user['username'],
            "role": user['role'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm="HS256")
        
        return {"token": token, "role": user['role'], "username": user['username']}
    
    return {"error": "Invalid credentials"}
