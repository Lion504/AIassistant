import json
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "../../data")

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
