from flask import Blueprint, request, current_app, Response, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from json import dumps
from flask_cors import CORS
from jwt import encode, decode, exceptions
import os

bp = Blueprint(__name__, 'auth', url_prefix='/auth')
CORS(bp)

@bp.route('/register', methods=['POST'])
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
        token = write_jwt(user.get('_id').__str__())
        return Response(token, 200)


def get_data(*keys):
    json = request.get_json(force=True)
    data = []
    for key in keys:
        data.append(json[key])
    return data


# def login_required(func):
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         if 'user_id' not in session:
#             return Response(dumps({
#                 "status": "error",
#                 "message": "You must be logged in to access this page."
#             }), 401, mimetype = 'application/json')
#         return func(*args, **kwargs)
#     return wrapper


def write_jwt(user_id):
    token = encode(payload={ "user_id": user_id }, key=os.getenv('SECRET_KEY'), algorithm='HS256')
    return token.encode('UTF-8')


def validate_jwt(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            header = request.headers['Authorization']
            token = header.split(" ")[1]
            payload = decode(token, key=os.getenv('SECRET_KEY'), algorithms=['HS256'])
            return func(payload, *args, **kwargs)
        
        except KeyError:
            return Response(dumps({
                "status": "error",
                "message": "There's no Authorization header in the request."
            }), 400, mimetype = 'application/json')
            
        except exceptions.DecodeError as e:
            print(e)
            return Response(dumps({
                "status": "error",
                "message": "Invalid token"
            }), 400, mimetype = 'application/json')
            
    return wrapper
        



# def set_profile_pic(profile_pic, username):
#     with Image.open(BytesIO(base64.b64decode(profile_pic))) as img:
#             path = os.path.join(current_app.config['PROFILE_PICS_FOLDER'], username)
#             for ext in ['.jpg', '.png']:
#                 try: 
#                     img.save(path + ext, optimize=True, quality=70)
#                     break
#                 except: continue