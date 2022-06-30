from auth import login_required
from flask import Blueprint, current_app, Response
from json import dumps


bp = Blueprint(__name__, 'routes')


@bp.route('/get_users')
@login_required
def get_users():
    storage = current_app.config['db'].users
    users = storage.find()
    return Response(dumps(users), 200, mimetype='application/json')