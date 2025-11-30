from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from routes import api

app = Flask(__name__)
CORS(app)

app.register_blueprint(api, url_prefix='/api')

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "OMA AI Navigator Backend"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
