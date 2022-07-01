from auth import login_required
from flask import Blueprint, current_app, Response
from bson import json_util
from flask_cors import cross_origin

bp = Blueprint(__name__, 'routes')


@bp.route('/get_users')
@cross_origin()
def get_users():
    storage = current_app.config['db'].users
    result = storage.find({})
    users = json_util.dumps(result, indent=2)
    return Response(users, 200, mimetype='application/json')