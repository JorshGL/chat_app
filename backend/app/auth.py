from flask import Blueprint, request, abort, g, jsonify, current_app
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
        return abort(400)
    
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
    return jsonify(response)


    
@bp.route('/login', methods=['POST'])
def login():
    pass
    

def load_user():
    pass

    
def create_unique_code():
    pass