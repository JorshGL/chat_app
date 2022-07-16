from auth import login_required, get_data, set_profile_pic
from flask import Blueprint, current_app, Response, session, request
from bson import json_util
from flask_cors import cross_origin
import re
from json import dumps



bp = Blueprint(__name__, 'routes', url_prefix='/users')


@bp.route('/all')
@login_required
@cross_origin()
def get_users():
    storage = current_app.config['db'].users
    result = storage.find({}, {'user' : 1, '_id' : 0})
    users = json_util.dumps(result, indent=2)
    return Response(users, 200, mimetype='application/json')


@bp.route('/<user>')
@login_required
@cross_origin()
def get_user(user):
    storage = current_app.config['db'].users
    result = storage.find_one({'user': user})
    json_user = json_util.dumps(result, indent=2)
    return Response(json_user, 200, mimetype='application/json')


@bp.route('/search/<user>')
@login_required
@cross_origin()
def search(user):
    users_finded = []
    storage = current_app.config['db'].users
    results = storage.find({}, {'user': 1, '_id': 0})
    for result in list(results):
        if re.match(user, result['user']) is not None:
            users_finded.append(result)
    return json_util.dumps(users_finded, indent=2)


@bp.route('/me', methods=['GET', 'PATCH'])
@cross_origin()
def account():
    user_id = session.get('user_id')
    storage = current_app.config['db'].users
    
    if request.method == 'GET':
        user = storage.find_one({'_id' : user_id})
        return Response(json_util.dumps(user), 
                        200, mimetype='application/json')
    
    if request.method == 'PATCH':
        name, username, password, profile_pic = get_data('name', 'user', 'pass', 'profile_pic')
        storage.update_one({'_id': user_id}, {'$set': {'name': name, 'user': user, 'pass': password}})
        if profile_pic is not None:
            set_profile_pic(profile_pic, username)
        return Response(dumps({
            'status' : 'updated',
            'user' : storage.find_one({'_id' : user_id})
        }), 200, mimetype = 'application/json')
        