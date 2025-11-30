from flask import Blueprint, request, jsonify
from services.search_service import find_best_task, find_electives
from services.llm_service import generate_navigation_response, explain_announcement, recommend_electives
from services.auth_service import register_user, authenticate_user

api = Blueprint('api', __name__)

@api.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    result = register_user(data.get('username'), data.get('password'), data.get('role', 'student'))
    if "error" in result:
        return jsonify(result), 400
    return jsonify(result)

@api.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    result = authenticate_user(data.get('username'), data.get('password'))
    if "error" in result:
        return jsonify(result), 401
    return jsonify(result)

@api.route('/navigate', methods=['POST'])
def navigate():
    data = request.json
    question = data.get('question', '')
    
    best_tasks = find_best_task(question)
    best_task = best_tasks[0] if best_tasks else None
    
    response_data = generate_navigation_response(question, best_task)
    
    # response_data is a dict: {"answer": ..., "image": ..., "source": ...}
    
    return jsonify({
        "answer": response_data["answer"],
        "link": best_task['url'] if best_task else None,
        "image": best_task.get('image') if best_task else response_data.get("image"),
        "candidates": best_tasks
    })

@api.route('/explain', methods=['POST'])
def explain():
    data = request.json
    text = data.get('text', '')
    
    explanation = explain_announcement(text)
    
    return jsonify(explanation)

@api.route('/electives', methods=['POST'])
def electives():
    data = request.json
    interests = data.get('interests', '')
    
    recommendations = find_electives(interests)
    explanation = recommend_electives(interests, recommendations)
    
    return jsonify({
        "explanation": explanation,
        "courses": recommendations
    })
