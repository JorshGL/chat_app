from flask import Blueprint, request, current_app, Response, session
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from json import dumps

bp = Blueprint(__name__, 'auth', url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register():
    storage = current_app.config['db'].users
    name, username, password = get_data('name', 'username', 'password')

    if not name or not username or not password:
        return Response(dumps({
            "status": "error",
            "message": "There's no name, username or password provided."
        }), 400, mimetype = 'application/json')
    
    if storage.find_one({'username' : username}) is not None:
        return Response(dumps({
            'status' : 'error',
            'message' : 'username already exists'
        }), 409, mimetype = 'application/json')
        
    hashed_pass = generate_password_hash(password)  
    user = {
        'name' : name,
        'username' : username,
        'password' : hashed_pass
    }
    storage.insert_one(user)
    return Response(dumps({
        'status' : 'success',
        'message' : f'user registered as {user}'
    }), 200, mimetype='application/json')

    
@bp.route('/login', methods=['POST'])
def login():
    storage = current_app.config['db'].users
    username, password = get_data('username', 'password')
    
    if not username or not password:
        return Response(dumps({
            "status": "error",
            "message": "There's no username or password provided."
        }), 400, mimetype = 'application/json')
    
    user = storage.find_one({'username' : username})
    if user is None:
        return Response(dumps({
            "status": "error",
            "message": "User not found"
        }), 404, mimetype = 'application/json')
    
    if check_password_hash(user.get('password'), password):
        session.clear()
        session['user_id'] = user.get('id')
        return Response(dumps({
            "status": "success"
        }), 200, mimetype = 'application/json')


def get_data(*keys):
    json = request.get_json()
    data = []
    for key in keys:
        data.append(json[key])
    return data


def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'user_id' not in session:
            return Response(dumps({
                "status": "error",
                "message": "You must be logged in to access this page."
            }), 401, mimetype = 'application/json')
        return func(*args, **kwargs)
    return wrapper


