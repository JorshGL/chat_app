from auth import login_required
from flask import Blueprint, current_app, Response
from bson import json_util
from flask_cors import cross_origin
import re


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