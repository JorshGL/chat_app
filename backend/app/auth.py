from flask import Blueprint, request, current_app, Response, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from json import dumps
from flask_cors import cross_origin
import os
from PIL import Image
import base64
from io import BytesIO


bp = Blueprint(__name__, 'auth', url_prefix='/auth')


@bp.route('/register', methods=['POST'])
@cross_origin()
def register():
    storage = current_app.config['db'].users
    name, username, password, profile_pic = get_data('name', 'user', 'pass', 'profile_pic')

    if not name or not username or not password:
        print(name, username, password)
        return Response(dumps({
            "status": "error",
            "message": "There's no name, username or password provided."
        }), 400, mimetype = 'application/json')
    
    if storage.find_one({'user' : username}) is not None:
        return Response(dumps({
            'status' : 'error',
            'message' : 'username already exists'
        }), 409, mimetype = 'application/json')
        
    hashed_pass = generate_password_hash(password)  
    user = {
        'name' : name,
        'user' : username,
        'pass' : hashed_pass,
        'profile_pic' : profile_pic,
        'chats' : []
    }
    storage.insert_one(user)
    return Response(dumps({
        'status' : 'success',
        'message' : f'user registered as {user}'
    }), 200, mimetype='application/json')

    
@bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    storage = current_app.config['db'].users
    username, password = get_data('user', 'pass')
    
    if not username or not password:
        return Response(dumps({
            "status": "error",
            "message": "There's no username or password provided."
        }), 400, mimetype = 'application/json')
    
    user = storage.find_one({'user' : username})
    if user is None:
        return Response(dumps({
            "status": "error",
            "message": "User not found"
        }), 404, mimetype = 'application/json')
    
    if check_password_hash(user.get('pass'), password):
        session.clear()
        session['user_id'] = user.get('_id').__str__()
        return Response(dumps({
            "status": "success"
        }), 200, mimetype = 'application/json')


def get_data(*keys):
    json = request.get_json(force=True)
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


# def set_profile_pic(profile_pic, username):
#     with Image.open(BytesIO(base64.b64decode(profile_pic))) as img:
#             path = os.path.join(current_app.config['PROFILE_PICS_FOLDER'], username)
#             for ext in ['.jpg', '.png']:
#                 try: 
#                     img.save(path + ext, optimize=True, quality=70)
#                     break
#                 except: continue