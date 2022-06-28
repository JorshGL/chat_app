from flask import Blueprint, current_app, request, abort, Response, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash


bp = Blueprint(__name__, 'auth', url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    storage = PyMongo(current_app).db.users
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    password = data.get('password')
        
    if not name or not username or not password:
        response = {
            'status' : 'error',
            'message' : "There's no name, no username or no password in request, please, try again."
        }
        return Response(jsonify(response), 400)
    
    hashed_pass = generate_password_hash(password)  
    user = {
        'name' : name,
        'username' : username,
        'password' : hashed_pass
    }
    storage.insert_one(user)
    
    response = {
        'status' : 'done',
        'message' : f'user registered as {user}'
    }
    return Response(jsonify(response), 200)

    
    
    
    
@bp.route('/login', methods=['POST'])
def login():
    pass
    

def load_user():
    pass

    
def create_unique_code():
    pass