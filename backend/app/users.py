from auth import get_data
from flask import Blueprint, current_app, Response, session, request
from bson import json_util, ObjectId
from flask_cors import CORS, cross_origin
import re
from json import dumps


bp = Blueprint(__name__, 'users', url_prefix='/users')
CORS(bp)

@bp.route('/all')
#
@cross_origin()
def get_users():
    storage = current_app.config['db'].users
    result = storage.find({}, {'user' : 1, '_id' : 0})
    users = json_util.dumps(result, indent=2)
    return Response(users, 200, mimetype='application/json')


@bp.route('/<user>')

def get_user(user):
    storage = current_app.config['db'].users
    result = storage.find_one({'user': user})
    json_user = json_util.dumps(result, indent=2)
    return Response(json_user, 200, mimetype='application/json')


@bp.route('/search/<user>')
# 
def search(user):
    users_finded = []
    storage = current_app.config['db'].users
    results = storage.find({}, {'user': 1, '_id': 0})
    for result in list(results):
        if re.match(user, result['user']) is not None:
            users_finded.append(result)
    return json_util.dumps(users_finded, indent=2)


@bp.route('/me', methods=['GET', 'PATCH'])

def account():
    user_id = ObjectId(session.get('user_id'))
    print(user_id)
    storage = current_app.config['db'].users
    
    if request.method == 'GET':
        user = storage.find_one({'_id' : user_id})
        print(user)
        return Response(json_util.dumps(user), 
                        200, mimetype='application/json')
    
    if request.method == 'PATCH':
        name, user, password, profile_pic = get_data('name', 'user', 'pass', 'profile_pic')
        check = storage.find_one({'user' : user})
        if check is not None and check.get('_id') != user_id:
            return Response(dumps({
                'status' : 'error',
                'message' : 'username already exists'
            }), 409, mimetype = 'application/json')
            
        storage.update_one({'_id': user_id}, {'$set': {'name': name, 'user': user, 'pass': password, 'profile_pic': profile_pic}})
        return Response(dumps({
            'status' : 'updated',
            'user' : json_util.dumps(storage.find_one({'_id' : user_id}))
        }), 200, mimetype = 'application/json')
        