from auth import login_required
from flask import Blueprint, current_app, Response
from bson import json_util
from flask_cors import cross_origin

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
